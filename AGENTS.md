# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React + TypeScript app and all runtime code.
- `src/App.tsx` wires the `Canvas` and routes between scenes.
- `src/scene/` holds top-level scenes (e.g., `Space`, `GiftBox`).
- `src/components/` holds reusable 3D pieces (camera, space, basic).
- `src/assets/` is for bundled assets; `public/` is for static files served as-is (textures, models, icons).
- `dist/` is Vite build output; do not edit manually.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the Vite dev server.
- `npm run build`: run TypeScript project build (`tsc -b`) and bundle for production.
- `npm run lint`: run ESLint over the repo.
- `npm run preview`: serve the production build locally.

## Coding Style & Naming Conventions
- TypeScript + React function components.
- Indentation is two spaces; use double quotes for strings to match existing `src/` files.
- Component filenames use PascalCase (e.g., `Starship.tsx`).
- Scene modules live under `src/scene/` and are imported by `src/App.tsx`.
- Linting is configured in `eslint.config.js` (no Prettier config is present).

## Testing Guidelines
- No test runner or test script is configured in `package.json`.
- If you add tests, also add a test script and update this section.
- Preferred naming: colocate `*.test.tsx` next to the module under test.

## Commit & Pull Request Guidelines
- Recent commits use scoped prefixes like `[hbd]`, `[hbd-t]`, or `[global]`.
- Keep messages short and imperative (e.g., `[hbd] Adjust target behavior`).
- PRs should include a brief summary, verification notes, and screenshots or short clips for visual/3D changes.
- Link related issues or references when available.

## Assets & Attribution
- Place large binaries in `public/` and reference via absolute paths (e.g., `/earth1024x512.png`).
- Record third-party asset sources and licenses in `README.md`.
