# daap-wp-integration

WordPress platform integration for the DAAP editor. This repo lives at `daap/integration/wp/` (gitignored in the parent) and provides all WP-specific hook implementations and build configuration.

## What this repo contains

```
integration/wp/
├── package.json            # build/dev/serve scripts
├── vite.config.ts          # WP build config — delegates to daap root
├── .env-example            # Template for .env (copy to .env, which is gitignored)
├── platform-flags.ts       # IPlatformFlags values for WordPress
├── application.tsx         # Entry: imports @daap/application-wp
├── hooks/                  # Re-exports of WP hook implementations from daap/src
│   ├── ai-hook.ts
│   ├── document-type-hook.ts
│   ├── extensions-hook.ts
│   ├── library-media-hook.ts    # WP no-op (no library media in WP)
│   ├── my-medias-hook.ts
│   ├── plugins-hook.ts
│   ├── project-hook.ts
│   ├── settings-hook.ts
│   └── template-hook.ts
└── utils/
    ├── load-extension.ts
    └── local-media.ts
```

## How it works

Scripts run `vite` from `daap/` root using daap's `node_modules`. The `@platform` alias points to this directory so all `@platform/hooks/...` imports resolve to the WP stubs here, which re-export the actual implementations in `daap/src/integration/hooks/` via `@daap` imports.

## Prerequisites

- Node.js 18+
- `daap/` dependencies installed: `cd daap && yarn install`
- No separate `node_modules` needed here
- A local `.env` file (see [Environment variables](#environment-variables-env))

## Commands

```sh
cd daap/integration/wp

yarn build    # production build → daap/dist/index.js
yarn dev      # watch mode — rebuilds on every file save (~5–15s per rebuild)
yarn serve    # serve daap/dist/ on http://127.0.0.1:8080
```

## Local development (WordPress plugin)

1. **Start MAMP** and verify WordPress is running (e.g. `http://localhost:8888`).

2. **Ensure `daap-design-studio-dev.php` exists** in the plugin root:
   ```
   /Applications/MAMP/htdocs/wordpress/wp-content/plugins/daap-design-studio/daap-design-studio-dev.php
   ```
   This defines `DAAP_FORCEREFRESH_DEVELOPMENT_MODE = "true"`, which makes the plugin load from `http://127.0.0.1:8080/index.js` instead of the bundled file.

3. **Terminal 1** — build and watch:
   ```sh
   cd daap/integration/wp
   yarn dev
   ```

4. **Terminal 2** — serve on port 8080:
   ```sh
   cd daap/integration/wp
   yarn serve
   ```

5. Open **WordPress admin → DAAP Design Studio**. The editor loads from your local build. After saving a file, wait for the watch rebuild to finish then hard-refresh (`Cmd+Shift+R`).

> **Note:** This workflow uses build-watch (full Rollup rebuild per save, ~5–15s). For faster iteration, use the SAAS build which has true Vite HMR.

## Environment variables (`.env`)

`.env` is gitignored. Create it from the template before building:

```sh
cd daap/integration/wp
cp .env-example .env
```

Vite loads it from this directory (`envDir` in `vite.config.ts`). Restart `yarn dev` after changing it.

| Variable | Description |
|---|---|
| `VITE_SAAS_API_URL` | SAAS API URL, used to load public templates, template media and template search (here and in `daap/src/template-generator`). **Required.** |
| `VITE_APP_LOGGER_LEVEL_*` | Logger verbosity per domain (0 = all, 100 = none). Injected into `index.html` via `%VITE_APP_LOGGER_LEVEL_*%`. **Required**, otherwise the HTML gets invalid JS |

## Platform flags

| Flag | WP value | Description |
|---|---|---|
| `hasAccountUI` | `false` | No account/login UI |
| `hasLibraryMedia` | `false` | No cloud media library |
| `hasAiTextAssistant` | `false` | No AI text button |
| `hasLayoutsButton` | `false` | No layouts panel button |
| `hasHomeLinkInSearch` | `false` | No home nav link |
| `hasWpSaveButton` | `true` | Shows WP save (floppy) button |
| `hasWpHomePage` | `true` | Shows WP home page dropdown |
| `hasWpContainerClass` | `true` | Applies WP container CSS class |
