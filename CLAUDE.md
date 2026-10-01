# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, uses `eslint-config-next`)
- No test runner is configured.

## Architecture

Portfolio site, currently the untouched `create-next-app` scaffold: Next.js 16.3 (App Router), React 19, TypeScript, Tailwind CSS v4.

- All routes live under `app/` (no `src/`, no `pages/`). `app/layout.tsx` is the root layout; `app/page.tsx` is the home page.
- Tailwind v4 is configured through CSS, not a `tailwind.config` file: `app/globals.css` does `@import "tailwindcss"` and maps theme tokens via `@theme inline` (`--background`/`--foreground`, with dark mode via `prefers-color-scheme`). PostCSS uses `@tailwindcss/postcss`.
- Import alias: `@/*` maps to the repo root (not `app/`).
- Next 16 differs from older versions: consult `node_modules/next/dist/docs/` (see AGENTS.md) rather than relying on memory.
