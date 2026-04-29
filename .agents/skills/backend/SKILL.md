---
name: backend
description: Backend API coding standards — server file structure, response envelope, error handling, import rules, and route organization.
---

# Backend Coding Standards

## 1. **Server File Organization (SoC)**

- Every server logic file (e.g. `whatsapp.ts`, `auth.ts`) **MUST** be in its own folder with the same kebab-case name.
- **Correct structure** (do NOT write one monolithic file):
  ```
  server/api/whatsapp/
    index.ts          # Router setup + exports
    whatsapp.ts       # Route handlers only
    types.ts          # Interface & type definitions
    utils.ts          # Local utility functions (client init, message sending, etc.)
  ```
- **File responsibilities**:
  - `index.ts` — Creates the router, mounts sub-routes, exports default router.
  - `[name].ts` — Only route handler functions (req → res logic). Imports types and utils.
  - `types.ts` — All interfaces, types, enums for this module.
  - `utils.ts` — Helper/utility functions (e.g. `initializeWhatsAppClient`, `sendWhatsAppMessage`).
- **Exception**: Small, simple routes (≤3 handlers, no local types, no utils) may stay as a single file if it genuinely fits. When it grows, refactor.

## 2. **Import Order (Server Files)**

Imports **MUST** be grouped and ordered as follows (blank line between groups):

### Section 1: 3rd party libraries
```ts
import express from "express";
import { Client, LocalAuth } from "whatsapp-web.js";
import type { Request, Response } from "express";
```

### Section 2: Shared project utilities (from `src/`)
Uses `../../src/...` relative paths:
```ts
import { normalizePhoneNumber } from "../../../src/utils/phone/normalize-phone";
```

### Section 3: Local module files (relative to this folder)

Sorted by path depth (`../../` → `../` → `./`), then within each depth: values → types → styles:

```ts
// Types come before values at the same depth
import type { EnhancedPhoneNumberEntry, BlastSession } from "./types";
import {
  generateSessionId,
  initializeWhatsAppClient,
  sendWhatsAppMessage,
} from "./utils";
```

## 3. **API Response Envelope**

All API responses **MUST** follow this envelope. Do NOT return flat objects.

### Success (`2xx`)
```json
{
  "data": {},   // Required. What the user sees/consumes.
  "meta": {}    // Required. Flags, pagination, internal state — NOT shown to the user.
}
```

### Error (`4xx` / `5xx`)
```json
{
  "errors": {},   // Required. Field validation: { fieldName: "message" } or { server: "message" }.
  "meta": {},     // Required. Error code, flags, timestamp.
  "data": {}      // Optional. Context data shown on error.
}
```

### HTTP Status Codes
- `200` success, `201` created
- `400` bad request / validation error
- `401` unauthorized, `403` forbidden
- `404` not found
- `409` conflict
- `422` unprocessable entity
- `500` internal server error
- **Never return `200` for a failed operation.**

## 4. **Error Handling**

- Use try/catch in route handlers.
- Catch block must return a proper status code + error envelope.
- Log the error server-side before responding.
- Validation errors go in `errors` with the field name as key.
- Unexpected errors return `500` with `errors: { server: "Internal server error" }`.

## 5. **Absolute vs Relative Imports**

- All files use the same import ordering rules (Section 2 above), but:
- Files **inside** `src/` may use `@/*` absolute imports (resolved by Vite bundler).
- Files **outside** `src/` (e.g. `server/`, `scripts/`) **MUST** use relative imports (`../../src/...`).
- The runtime (Node.js ESM / tsx) does not resolve tsconfig path aliases.