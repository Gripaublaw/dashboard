# Skill: Formularis no controlats (HTML natiu)

## Quan fer servir aquesta skill
Quan hagis de modificar un component de Preact (a `islands/`) que contingui un formulari amb `useSignal` per als camps.

## Regles d'actuació
1. Elimina els signals dels camps del formulari (`formName`, `formEmail`, `formRole`, etc.). Deixa només els signals d'estat (`submitting`, `fieldErrors`).
2. Afegeix un signal `formRef` per referenciar el formulari: `const formRef = useSignal<HTMLFormElement | null>(null);`
3. Canvia el `<form>` perquè tingui un `id` únic (ex: `id="new-user-form"`) i el `ref` (`ref={(el) => (formRef.value = el)}`).
4. Canvia tots els `<input>` i `<select>` perquè tinguin `name="..."` i eliminin `value={...}` i `onInput={...}`.
5. Modifica el `submitForm` per recollir les dades amb `FormData` usant `document.getElementById("id-del-form")`.
6. Modifica el `closeForm` per netejar el formulari amb `formRef.value?.reset()`.

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
```
### Després (formulari no controlat):
```tsx
const formRef = useSignal<HTMLFormElement | null>(null);

async function submitForm(e: Event) {
  e.preventDefault();
  const form = document.getElementById("new-user-form") as HTMLFormElement;
  if (!form) return;
  const formData = new FormData(form);
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  // ...
}

<form id="new-user-form" ref={(el) => (formRef.value = el)} onSubmit={submitForm}>
  <input name="name" />
  <input name="email" />
</form>
```
