# Dashboard de l'ecosistema digital — guia d'integració

Panell de control per a un ecosistema digital, fet amb **Deno + Fresh 2 +
Preact + Tailwind CSS v4**. Tot el codi està pensat per enganxar-se directament
a les carpetes `routes/`, `components/`, `islands/` i `lib/` d'un projecte Fresh
ja creat.

## 1. Fitxers generats

```
routes/
  _app.tsx            shell HTML + script anti-flash del tema (substitueix l'existent)
  index.tsx           /            → Inici
  apps.tsx            /apps        → Aplicacions
  usuaris.tsx         /usuaris     → Usuaris
  configuracio.tsx    /configuracio→ Configuració
  connexions.tsx      /connexions  → Connexions

components/           (sense estat, es poden renderitzar al servidor)
  DashboardShell.tsx  marc comú: sidebar + header + main + PageHeading
  ActionButton.tsx    botó primari / secundari / fantasma
  Card.tsx            Card, SectionHeader, InitialsBadge, EmptyState
  DataTable.tsx       taula responsive + RowActions (editar/eliminar/veure)
  MetricCard.tsx      targeta de mètrica (KPI)
  StatusBadge.tsx     píndola d'estat amb punt de color
  Icon.tsx            joc d'icones SVG inline (24 × 24)

islands/              (interactius, s'hidraten al client)
  state.ts            signals compartits: `theme` i `locale` + persistència
  SidebarNav.tsx      navegació lateral + calaix mòbil
  Header.tsx          capçalera: cerca, idioma, tema, compte i tancar sessió
  LocaleSwitch.tsx    commutador CA / EN
  ThemeToggle.tsx     commutador clar / fosc
  AppsTable.tsx       taula d'apps amb filtre, cerca i estat buit
  UsersTable.tsx      taula d'usuaris amb filtre, cerca i estat buit
  ConnectionsList.tsx llistat de connexions + calaix d'edició
  SettingsForm.tsx    formulari de configuració amb validació i previsualització
  ActivityList.tsx    activitat recent traduïda (Inici)

lib/
  i18n.ts             diccionari CA / EN + `t(locale, key)`
  data.ts             dades simulades (substitueix-les per consultes reals)

assets/styles.css     tokens Tailwind v4 (@theme) + tema clar (.light)
App.jsx, preview/     només per a la previsualització en navegador; NO copiar
```

`App.jsx` i `preview/` existeixen únicament per revisar el disseny fora de Deno.
El codi que s'integra al projecte Fresh és el conjunt `.tsx` de dalt.

## 2. Passos d'integració

1. Copia les carpetes `routes/`, `components/`, `islands/` i `lib/` sobre el
   projecte existent (sobreescrivint `routes/_app.tsx` i `routes/index.tsx`).
2. Substitueix el contingut de `assets/styles.css` pels tokens inclosos. Ja
   manté la regla `.fresh-gradient` original per si la segueixes fent servir.
3. Comprova que `deno.json` ja inclou `tailwindcss` i `@tailwindcss/vite`
   (el projecte actual sí que els té) i que el plugin de Tailwind està actiu a
   `vite.config.ts`.
4. Executa `deno task dev` i obre `/`, `/apps`, `/usuaris`, `/configuracio` i
   `/connexions`.
5. Abans de desplegar: `deno fmt`, `deno lint`, `deno check`.

## 3. Idiomes (CA / EN)

- Totes les cadenes viuen a `lib/i18n.ts` com a parells `[català, anglès]`.
- Les rutes renderitzen el text inicial amb `t("ca", "clau")` (SSR estable).
- Els illots llegeixen `locale.value` del signal compartit
  (`islands/state.ts`), de manera que prémer **CA** o **EN** tradueix alhora la
  barra lateral, la capçalera, les taules, l'activitat i els formularis.
- Per afegir un idioma nou: afegeix la clau a `LOCALES`, a `LOCALE_LABEL` i una
  tercera posició a cada entrada del diccionari.

## 4. Tema clar / fosc

- El tema fosc és el valor per defecte (`#1e1e2e` de fons, `#2a2a3e` a les
  targetes).
- `ThemeToggle` crida `toggleTheme()`, que actualitza el signal, la classe
  `html.dark` / `html.light`, `color-scheme` i `localStorage["nexus.theme"]`.
- L'script en línia de `routes/_app.tsx` aplica el tema desat abans del primer
  pintat (sense flaix blanc).
- Tots els colors surten de tokens: no hi ha colors incrustats als components.

## 5. Connectar el backend

El frontend ja està preparat: **totes** les crides passen per `lib/api.ts`.

1. Copia `routes/api/_skeleton.tsx` → `routes/api/apps.tsx` (i fes el mateix per
   `usuaris`, `connexions` i `configuracio`). El prefix `_` fa que Fresh no
   registri l'esquelet mentre no el vulguis activar.
2. Substitueix el magatzem en memòria per la teva font de dades real.
3. A `lib/api.ts`, canvia `USE_REMOTE = false` per `true`.

El contracte de cada endpoint és a la capçalera de `lib/api.ts` i dins
l'esquelet. Els illots ja gestionen validació, botó desactivat, text
«S'està desant…», bàner d'èxit i bàner d'error.

| Estat | Component |
|---|---|
| Enviament | `ActionButton loading` (`aria-busy`) |
| Èxit | `FeedbackBanner` to `success` |
| Error | `FeedbackBanner` to `danger` — mai text HTTP cru (`errorKey()`) |
| Buit | `EmptyState` |
| Confirmació destructiva | `Modal` amb botó variant `danger` |

Queda per al backend: esquema real, autenticació, permisos per rol,
emmagatzematge del logo, cookies de tema/idioma i validació al servidor.

## 6. Personalització ràpida

| Vull canviar… | On |
|---|---|
| Color d'accent | `assets/styles.css` → `--color-brand`, `--color-brand-soft`, `--color-brand-ink` (tema fosc) i dins `html.light` |
| Radi de cantonades | `--radius-lg` (8 px) i `--radius-md` (6 px) |
| Tipografia | `--font-display`, `--font-sans`, `--font-mono` (caldrà carregar les fonts al `<head>`) |
| Usuari de la capçalera | `components/DashboardShell.tsx` → props `userName`, `userEmail`, `initials` |
| Dades de les taules | `lib/data.ts` |
| Valors inicials de Configuració | `lib/settings.ts` |
| Textos | `lib/i18n.ts` |

## 7. Què és real i què és simulació

- **Real:** navegació, tema, idioma, filtres i cerques, estats buits, validació
  dels formularis, cicles d'enviament/èxit/error, confirmacions destructives,
  capa `lib/api.ts` amb contracte definit i accessibilitat (focus visible,
  `aria-pressed`, `aria-current`, `aria-live`, etiquetes `sr-only`).
- **Simulat:** `lib/api.ts` resol amb dades locals després d'una latència
  curta; no fa cap crida de xarxa fins que activis `USE_REMOTE`.
- **Pendent d'integració:** els endpoints reals a `routes/api/…`, l'autenticació
  i l'emmagatzematge del logo.

## 8. Fitxers de previsualització

`App.jsx`, `preview/` i `index.html` són **només per revisar al navegador** i no
formen part del codi Fresh. No els copiïs al projecte: deixa'ls al workspace o
elimina'ls si no els necessites.

Per veure'ls, cal servir el workspace amb un servidor local (el renderer
d'aquest entorn no pot carregar fitxers locals):

```bash
deno run -A jsr:@std/http/file-server .
# o bé
python3 -m http.server 8080
```
