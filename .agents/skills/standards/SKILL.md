---
name: standards
description: Master index for project coding standards. Load this to get a summary; load individual skills below for detailed rules.
---

# Project Coding Standards

This project's standards are split into separate skills for focused reference.

## Available Skills

| Skill | Purpose |
|-------|---------|
| **`file-organization`** | Naming conventions, folder structure, when/how to split files into folders |
| **`frontend`** | React component structure, hooks, Panda CSS styling, state management, frontend import order, usecase extraction, sub-component barrel imports |
| **`backend`** | Server file SoC (router / types / utils split), API response envelope, error handling, server import order, absolute vs relative imports |

## Quick Rules (Apply Everywhere)

1. **Import Order**: 3rd party → `@/` internal → relative imports by depth (`../../` → `../` → `./`). Within each depth: value imports → `import type` → `import {} from './styles'`. Blank line between each section.
2. **Type Imports**: Always `import type { ... }` for type-only imports.
3. **SoC**: When a file needs types, utils, or multiple concerns — split it into a folder (`index.ts`, `types.ts`, `utils.ts`, etc.).
4. **Absolute imports** (`@/*`) work only inside `src/`. Files in `server/`, `scripts/`, etc. use relative imports.
5. **Backend responses** follow `{ data, meta }` (success) or `{ errors, meta, data? }` (error) envelope with proper HTTP status codes.
6. **Usecase hooks**: Use `options` object for parameters, infer return type (no explicit `Return` interface). If complex, split into a folder with `types.ts`, `constants.ts`, etc.
7. **Components are pure presentation**: No `useState`, `useCallback`, `useEffect`, `useMemo`, `useRef` in `.tsx` files. All logic goes in usecase hooks, composed by an "actions" usecase.

For detailed rules, load the specific skill (e.g. `skill("backend")`, `skill("frontend")`, `skill("file-organization")`).