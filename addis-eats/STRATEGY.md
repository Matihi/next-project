### Route Strategies

- / — static — response does not depend on the request.
- /\_not-found — static — response does not depend on the request.
- /cart — CSR — page is rendered and updated in the browser.
- /checkout — dynamic (SSR) — makes `cookies()` read.
- /login — static — response does not depend on the request.
- /menu — static with revalidation (ISR) — menu data is regenerated at most once per hour.
- /menu/[slug] — static via params (SSG) — pages are generated for the known menu slugs at build time.
- /register — static — response does not depend on the request.

Route (app) Revalidate Expire\
┌ ○ /\
├ ○ /\_not-found\
├ ○ /cart\
├ ƒ /checkout\
├ ○ /login\
├ ○ /menu 1h 1y\
├ /menu/[slug]\
│ ├ ● /menu/doro-wat\
│ ├ ● /menu/siga-wat\
│ ├ ● /menu/beg-alicha-wat\
│ └ ● [+17 more paths]\
└ ○ /register

○ (Static) prerendered as static content\
● (SSG) prerendered as static HTML (uses generateStaticParams)\
ƒ (Dynamic) server-rendered on demand
