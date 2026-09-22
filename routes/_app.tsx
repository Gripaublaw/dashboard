import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nexus · Ecosistema digital</title>
        <meta name="color-scheme" content="dark light" />
        {/* Default theme = dark. Flip to "light" for the light palette. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(){try{var t=localStorage.getItem("nexus.theme")||"dark";var l=localStorage.getItem("nexus.locale")||"ca";document.documentElement.className=t==="dark"?"dark":"light";document.documentElement.lang=l;document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.className="dark";}})();`,
          }}
        />
      </head>
      <body class="bg-base">
        <Component />
      </body>
    </html>
  );
});
