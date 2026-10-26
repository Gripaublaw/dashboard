# Skill: Migració completa de Fresh (OCD) a entorn connectat a l'API

## Quan fer servir aquesta skill
Quan hagis de migrar un projecte Fresh generat amb Open CoDesign (o similar) a un entorn connectat a una API real (Hono + PostgreSQL), amb formularis no controlats i totes les rutes funcionant.

## Fases de la migració

### Fase 1: Preparar el backend (API)
Abans de tocar el frontend, assegura't que el backend té totes les rutes necessàries:

1. **Comprova que existeixen els fitxers de rutes** (`src/routes/*.ts`) per a cada entitat (apps, usuaris, connexions, etc.).
2. **Comprova que cada fitxer té totes les rutes:** GET (llistar), GET /:id (obtenir), POST (crear), PATCH /:id (editar), DELETE /:id (esborrar).
3. **Comprova que el CORS** a `src/main.ts` permet tots els mètodes: `["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]`.
4. **Comprova que el `schema.ts`** té definides totes les taules necessàries.
5. **Executa les migracions** (`drizzle-kit generate` i `drizzle-kit migrate`) per assegurar-te que les taules existeixen a PostgreSQL.

### Fase 2: Connectar les rutes del frontend a l'API
Per a cada pàgina (`routes/*.tsx`):

1. **Canvia la importació de dades:** elimina `import { ... } from "../lib/data.ts"` i afegeix `import { listX } from "../lib/api.ts"`.
2. **Canvia la càrrega de dades:** en lloc de passar les dades simulades, fes una crida a l'API (`await listApps()`, `await listUsers()`, etc.).
3. **Assegura't que el component de la pàgina és `async`** (perquè ha d'esperar la resposta de l'API).

### Fase 3: Aplicar el patró de formularis no controlats (illes)
Per a cada illa (`islands/*.tsx`):

1. **Elimina els signals dels camps del formulari** (`formName`, `formEmail`, etc.). Deixa només els signals d'estat (`submitting`, `fieldErrors`, `editingId`).
2. **Afegeix un signal `formRef`** per referenciar el formulari: `const formRef = useSignal<HTMLFormElement | null>(null);`
3. **Canvia el `<form>`** perquè tingui un `id` únic (ex: `id="new-app-form"`) i el `ref` (`ref={(el) => (formRef.value = el)}`).
4. **Canvia tots els `<input>` i `<select>`** perquè tinguin `name="..."` i eliminin `value={...}` i `onInput={...}`.
5. **Modifica el `submitForm`** per recollir les dades amb `FormData` usant `document.getElementById("id-del-form")`.
6. **Modifica el `closeForm`** per netejar el formulari amb `formRef.value?.reset()`.
7. **Afegeix la lògica d'edició:**
   - Crea un signal `editingId` per saber si estàs editant o creant.
   - Quan es cliqui el llapis (`openEdit`), guarda l'ID a `editingId` i omple els camps amb `requestAnimationFrame`.
   - Al `submitForm`, si `editingId` té valor, crida `updateApp`/`updateUser`; si no, crida `createApp`/`createUser`.
8. **Canvia el títol del modal** perquè sigui dinàmic: `title={editingId.value ? t(current, "action.edit") : t(current, "form.newApp")}`
9. **Canvia el botó de submit** perquè faci servir `requestSubmit()` en lloc de pedaços: `onClick={() => formRef.value?.requestSubmit()}`

### Fase 4: Verificar i provar
1. **Comprova que `deno check` passa** al backend i al frontend.
2. **Arrenca els servidors** i prova el flux complet: crear, editar i esborrar.
3. **Comprova que les dades reals apareixen** al navegador (no les simulades).

## Errors comuns i com evitar-los

| Error | Causa | Solució |
| :--- | :--- | :--- |
| **404 a l'API** | La ruta no existeix al backend | Afegeix la ruta que falta (GET, POST, PATCH, DELETE) |
| **409 a l'API** | Email o slug duplicat | Comprova que les dades no xoquin amb un altre registre |
| **El botó de submit no fa res** | El formulari no té `id` o el `FormData` no troba els camps | Assegura't que el `<form>` té `id` i els inputs tenen `name=` |
| **El llapis no obre les dades** | El `openEdit` no està connectat o no omple els camps | Revisa que el `requestAnimationFrame` i el `namedItem` funcionin |
| **Error de CORS** | El backend no permet el mètode | Afegeix el mètode a `allowMethods` |

## Exemple de codi (abans/després)

### Abans (formulari controlat):
```tsx
const formName = useSignal("");
const formEmail = useSignal("");

<form onSubmit={submitForm}>
  <input
    value={formName.value}
    onInput={(e) => (formName.value = e.currentTarget.value)}
  />
  <input
    value={formEmail.value}
    onInput={(e) => (formEmail.value = e.currentTarget.value)}
  />

</form> 
const formRef = useSignal<HTMLFormElement | null>(null);
const editingId = useSignal<string | null>(null);

async function submitForm(e: Event) {
  e.preventDefault();
  const form = document.getElementById("new-user-form") as HTMLFormElement;
  if (!form) return;
  const formData = new FormData(form);
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();

  if (editingId.value) {
    await updateUser(editingId.value, { name, email });
  } else {
    await createUser({ name, email });
  }
  closeForm();
}

function openEdit(row: UserRow) {
  editingId.value = row.id;
  formOpen.value = true;
  requestAnimationFrame(() => {
    const form = formRef.value;
    if (!form) return;
    (form.elements.namedItem("name") as HTMLInputElement).value = row.name;
    (form.elements.namedItem("email") as HTMLInputElement).value = row.email;
  });
}

<form id="new-user-form" ref={(el) => (formRef.value = el)} onSubmit={submitForm}>
  <input name="name" />
  <input name="email" />
</form> 
```
