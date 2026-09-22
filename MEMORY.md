---
schemaVersion: 1
scope: workspace
updatedAt: "2026-09-22T08:55:39.619Z"
workspaceName: "dashboard"
---

# Project Memory

## Project Overview
- Dashboard per a un ecosistema digital, integrable directament en un projecte Fresh existent (Deno 2 + Fresh 2 + Tailwind CSS v4).
- Objectiu: codi enganxable a `routes/`, `components/` i `islands/` d'un projecte ja creat, no un projecte nou.
- Cinc seccions: Inici, Aplicacions, Usuaris, Configuració, Connexions. Interface bilingüe CA/EN i tema clar/fosc.

## Current State
- Codi Fresh complet: 5 rutes + `_app.tsx`, 9 illots, components reutilitzables, diccionari i18n, dades simulades.
- Capa de dades encapsulada: totes les crides passen per `lib/api.ts` amb `USE_REMOTE = false` (dades locals). Per connectar el backend, canviar a `true` sense tocar cap illot.
- Estats reals d'enviament i error als quatre illots (botó desactivat amb `aria-busy`, text "S'està desant…", bàner d'èxit, bàner d'error). Errors mai mostren text HTTP cru (mapatge via `errorKey()`).
- Confirmacions destructives amb botó `danger` i avís "no es pot desfer".
- Les rutes passen dades llavor des del servidor perquè el primer pintat tingui contingut real.
- **`App.jsx` reescrit com a fitxer únic i autocontingut** (icones, paletes fosc/clar, diccionari CA/EN i dades simulades a dins; zero imports). És ara l'únic punt d'entrada de revisió visual.
- **Causa real del `ERR_FILE_NOT_FOUND` identificada**: el renderer de l'entorn copia només el fitxer d'entrada a una carpeta temporal, així que qualsevol import relatiu (`./App.jsx`, `./preview/shared.js`) no resol. És limitació d'entorn, no del codi. Continua sense poder-se verificar visualment aquí.

## Artifacts
- `routes/index.tsx`, `apps.tsx`, `usuaris.tsx`, `configuracio.tsx`, `connexions.tsx` — les cinc seccions, amb dades llavor del servidor.
- `routes/_app.tsx` — shell del document + script inline que aplica el tema abans del primer pintat.
- `routes/api/_skeleton.tsx` — plantilla comentada i copiable per al backend (el prefix `_` fa que Fresh no la registri).
- `components/DashboardShell.tsx` — marc comú (sidebar + header + contingut).
- `components/MetricCard.tsx`, `Card.tsx`, `DataTable.tsx`, `StatusBadge.tsx`, `ActionButton.tsx`, `Icon.tsx` — primitives reutilitzables.
- `components/FeedbackBanner.tsx`, `components/Modal.tsx` — unifiquen èxit/error i formularis de crear/editar.
- `islands/state.ts`, `SidebarNav.tsx`, `Header.tsx`, `LocaleSwitch.tsx`, `ThemeToggle.tsx`, `AppsTable.tsx`, `UsersTable.tsx`, `ConnectionsList.tsx`, `SettingsForm.tsx`, `ActivityList.tsx`.
- `lib/api.ts` — contracte de dades únic; `lib/i18n.ts` — diccionari CA/EN; `lib/data.ts` — dades simulades amb dates fixes per SSR estable; `lib/settings.ts` — valors llavor de Configuració.
- `assets/styles.css` — tokens Tailwind v4. `DESIGN.md` — font autoritativa (215 línies, frontmatter intacte). `README.md` — guia d'integració.
- `App.jsx` — **punt d'entrada de la revisió visual**, autocontingut (~1923 línies), no integrable.
- `index.html` + `preview/` (`shared.js`, `sections.js`, `ui.js`, `dict.js`) — **redundants** des que `App.jsx` és autocontingut; es conserven perquè no interfereixen amb Fresh, però ja no són la via de revisió.

## Design Direction
- Tema fosc per defecte: fons `#1e1e2e`, targetes `#2a2a3e`; commutador a tema clar.
- Tipografia neta i moderna, cantonades arrodonides de 8 px, icones clares per secció.
- Estructura app-shell: barra lateral esquerra fixa, capçalera superior (nom de l'ecosistema a l'esquerra; CA/EN, tema i usuari + tancar sessió a la dreta).
- Tot l'estil amb classes de Tailwind; tots els textos traduïbles.
- Jerarquia de text consistent: `strong → body → muted → muted-2`.
- Color reservat a estat real: cap accent decoratiu; `brand` només per a navegació activa i accions primàries.

## User Feedback
- L'usuari pregunta si el projecte està llest i on veure'l: calgué aclarir que el codi és llest però la previsualització a l'entorn no funciona.
- L'usuari demana delimitar responsabilitats frontend vs backend; accepta la proposta de capa d'API + estats + esquelet d'endpoint.
- Sobre els fitxers de previsualització: l'usuari prefereix conservar-los si no compliquen res, i delega la decisió a l'assistent amb criteri d'eficiència d'execució per davant de la netedat. Decisió presa: **mantenir-los**.
- (Cap feedback estètic explícit encara; l'usuari ha demanat "primer reviso el disseny".)

## Decisions
- El projecte Fresh ja existia: s'ha estès, no reconstruït; títol i disseny previs preservats.
- Tema fosc per defecte, clar opcional; preferència persistida i aplicada abans del pintat per evitar flaix.
- i18n CA/EN amb diccionari central i commutador que canvia tots els textos.
- Components reutilitzables obligatoris a `components/`.
- Dades simulades amb dates fixes per garantir SSR estable.
- **Delimitació acordada frontend/backend**: frontend = estats visuals, confirmacions destructives, contracte de dades, `lib/api.ts`, validació de camps al client, bilingüisme, tema i accessibilitat. Backend = esquema real, autenticació, permisos per rol, validació al servidor, emmagatzematge del logo i cookies de sessió.
- **Es mantenen `App.jsx`, `preview/`, `preview.html` i `index.html`**; `App.jsx` passa a ser el punt d'entrada de revisió i `preview/` queda com a còpia redundant.
- Els estats d'acció (enviament/error) queden centralitzats a `FeedbackBanner` i `Modal` perquè tots els formularis es comportin igual.
- `FeedbackBanner` discrimina entre fill string i objecte `{key, vars}` (correcció d'un error real de render en desar).

## Open Questions
- Cal implementar `routes/api/apps.tsx` de debò amb Deno KV, o l'usuari vol revisar primer el disseny al navegador?
- Persistència de tema/idioma al servidor (cookies) o només a localStorage?
- Pujada real del logo a Configuració (ara `FileReader` + validació de tipus i mida ≤512 KB, sense enviament).
- Què cal ajustar després de la revisió visual de l'usuari (contrastos del tema clar i densitat de taules són els candidats probables).

## Next Steps
- L'usuari revisa `App.jsx` al navegador (`deno run -A jsr:@std/http/file-server .`, port 4507) o en un sandbox de React; recollir el seu feedback.
- Implementar endpoints reals (`routes/api/apps.tsx`…) si l'usuari ho aprova; després `USE_REMOTE = true` a `lib/api.ts`.
- Decidir persistència de tema/idioma i adaptar el client per rebre valor inicial del servidor.
- Valorar si `preview/` i `index.html` es poden eliminar ara que `App.jsx` és autocontingut.
- Abans de desplegar: `deno fmt`, `deno lint`, `deno check`.

## Promotion Candidates For DESIGN.md
- Tema fosc per defecte (`#1e1e2e` fons, `#2a2a3e` targetes) i parell de tema clar.
- Radi de cantonada de 8 px a targetes, botons i inputs.
- Estructura app-shell (sidebar esquerra + header superior) com a patró estable.
- Tema/idioma amb signals, persistits i aplicats pre-paint.
- Mapatge estat→to semàntic (active→success, pending→warning, error→danger, invited→info, inactive→neutral).
- Patrons d'estat d'acció: enviament (desactivat + `aria-busy` + "S'està desant…"), èxit i error en línia via bàner, confirmació destructiva amb to `danger`.
- Jerarquia de text `strong → body → muted → muted-2` i color reservat a estat real (`brand` només per navegació activa i accions primàries).
- (Secció de revisió standalone ja documentada a DESIGN.md.)

## Recent History
- 2026-09-22: Inspecció del projecte Fresh; lectura de `Button.tsx`, `Counter.tsx`, `_app.tsx`, `styles.css`, `deno.json`.
- 2026-09-22: Creats i18n, dades, illots d'estat i components reutilitzables; shell i tokens Tailwind v4; taules/llistes i les cinc rutes.
- 2026-09-22: Creat i validat `DESIGN.md`; afegit `README.md`.
- 2026-09-22: Creada previsualització standalone; corregida clau duplicada `tagline`. El renderer falla amb `ERR_FILE_NOT_FOUND` (limitació d'entorn).
- 2026-09-22: Aclarides les dues vies de visualització i la frontera frontend/backend.
- 2026-09-22: Creat `lib/api.ts` amb contracte i `USE_REMOTE`; afegits `FeedbackBanner` i `Modal`; estats d'enviament/error i confirmacions destructives als quatre illots; rutes amb dades llavor; creat `lib/settings.ts` i `routes/api/_skeleton.tsx`.
- 2026-09-22: Actualitzats README i DESIGN.md (patrons d'estat); corregit el delimitador `---` del frontmatter de DESIGN.md.
- 2026-09-22: Revisió del disseny. Diagnòstic del `ERR_FILE_NOT_FOUND`: el renderer copia només el fitxer d'entrada, així que els imports relatius no resolen. `App.jsx` reescrit com a fitxer únic autocontingut (zero imports); corregit el render de `FeedbackBanner` amb fills objecte; afegida secció de revisió standalone a `DESIGN.md`. Verificació visual encara no possible a l'entorn.