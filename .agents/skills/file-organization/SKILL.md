---
name: file-organization
description: Universal file and folder organization rules — naming conventions, refactoring, and when to split files.
---

# File Organization Standards

## 1. **Naming Conventions**

| What | Case | Example |
|------|------|---------|
| Folders | kebab-case | `my-component/`, `use-auth/` |
| React components | PascalCase | `MyComponent.tsx` |
| Hooks | kebab-case | `use-some-feature.ts` |
| Utility files | kebab-case | `format-date.ts` |
| Style files | kebab-case | `styles.ts` |
| Type files | kebab-case | `types.ts` |

## 2. **When to Split a File Into a Folder**

A file that starts as a single file (e.g. `whatsapp.ts`) **MUST** be refactored into a folder when it gains any of these:

- **Type/interface definitions** (→ extract to `types.ts`)
- **Local utility functions** (→ extract to `utils.ts`)
- **Use case / business logic** (→ extract to `usecases/`)
- **Styles** (→ extract to `styles.ts`)
- **Multiple route handlers** (→ extract to `[name].ts` + `index.ts`)

## 3. **Refactored Folder Pattern**

```
/whatsapp
  index.ts          # Main export / router setup
  whatsapp.ts       # Core implementation / route handlers
  types.ts          # Type and interface definitions
  utils.ts          # Local helper/utility functions
  usecases/         # Business logic (if applicable)
    use-case-name.ts
  styles.ts         # Panda CSS styles (frontend only)
```

## 4. **Universal Application**

This rule applies to **all contexts**:
- Server API files (`server/api/`)
- Client components (`src/components/`)
- Hooks (`src/hooks/`)
- Utilities (`src/utils/`)
- Repositories (`src/repositories/`)
- Models (`src/models/`)
- Any other directory in the codebase

## 5. **Refactoring Process**

1. Create a kebab-case folder with the same name as the original file
2. Move the original file into the folder, rename to match the folder name
3. Create `index.ts` that exports the main functionality
4. Extract concerns into appropriate files (`types.ts`, `utils.ts`, etc.)
5. Update all imports across the codebase

## 6. **Goal**

Prevent files from becoming overly complex. Maintain clear separation of concerns. When a file grows beyond its original purpose, split it immediately — don't wait for it to become unmanageable.