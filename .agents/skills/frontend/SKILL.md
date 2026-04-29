---
name: frontend
description: Frontend React coding standards — component structure, hooks, Panda CSS styling, state management, usecase extraction, react-query usage, sub-component barrel imports, and strict import ordering.
---

# Frontend Coding Standards

## 1. **Component Structure**

- **DO NOT** create standalone `.tsx` component files (e.g. `src/components/MyComponent.tsx`).
- Every component **MUST** be in its own kebab-case folder:
  ```
  src/components/my-component/
    index.ts          # Export default + named export
    MyComponent.tsx   # React component (PascalCase)
    styles.ts         # Panda CSS styles via css({})
    types.ts          # Type/interface definitions
  ```
- **Props Destructuring**: Accept `props` as a single argument, destructure inside the body:
  ```tsx
  function MyComponent(props: MyComponentProps) {
    const { name, age } = props;
  }
  ```

## 2. **Separation of Concerns (SoC)**

- **Components handle UI only** — delegate all logic to usecase hooks.
- **Usecase hooks** are specific and single-purpose: `use-[component-name]-[action-type].ts`
- Location: `src/**/usecases/[use-case-name].ts`

### 2a. **Extracting Logic Into Usecases**

Any non-trivial stateful logic in a component **MUST** be extracted into a dedicated usecase hook. Examples:

| Logic | Usecase File |
|-------|-------------|
| Polling WhatsApp QR code | `src/**/usecases/use-poll-whatsapp-qr.ts` |
| Sending blast messages | `src/**/usecases/use-blast-send.ts` |
| Parsing phone number input | `src/**/usecases/use-parse-phone-input.ts` |
| Tracking blast progress | `src/**/usecases/use-blast-progress.ts` |

**Rule of thumb**: If a `useEffect` + state is more than ~10 lines extracting data from an external source (API, WebSocket, etc.), it belongs in a usecase hook.

### 2b. **Actions Usecase Pattern — Pure Presentation Components**

A component **MUST NOT** contain any React hooks (`useState`, `useCallback`, `useEffect`, `useMemo`, `useRef`). All state, derived values, and event handlers are owned by a single parent "actions" usecase.

```tsx
// ✅ CORRECT — The component imports everything from a single actions usecase
const MyComponent = () => {
  const {
    rawInput, setRawInput,         // UI state + setters
    handleSubmit, handleCancel,    // event handlers (already wrapped in useCallback)
    derivedCount,                  // derived values
    isBlasting,                    // state from child usecases
  } = useMyComponentActions();

  return <div>...pure JSX, no hooks...</div>;
};
```

The actions usecase internally composes all child usecases and owns all component-level state:

```
src/components/modules/whatsapp-blast/usecases/
  use-whatsapp-blast-actions.ts    ← owns UI state, event handlers, derived values
  use-whatsapp-blast.ts            ← blast send/retry/parse logic
  use-poll-whatsapp-qr.ts          ← QR polling via useQuery
```

**Rule**: If a `.tsx` file imports `useState`, `useCallback`, `useEffect`, or `useMemo` from React, it has violated SoC. The only React import allowed in a component file is `cx` from Panda CSS. Every hook lives in a usecase file.

### 2c. **Usecase Hook Convention**

- **No `Return` interface.** The return type is inferred from the hook body. Do not define `UseXxxReturn`.
- **Accept `options` object.** If a usecase needs parameters, accept a single `options` object with an interface defined inside the same file:

  ```ts
  // ✅ CORRECT — simple usecase, options interface in file
  interface UsePollWhatsAppQrOptions {
    enabled: boolean;
  }

  export function usePollWhatsAppQr(options: UsePollWhatsAppQrOptions) {
    ...
  }
  ```

- **Barrel export**: All usecase hooks in a module are re-exported from a `usecases/index.ts` barrel so consumers import from `"./usecases"` instead of individual files:

  ```ts
  // usecases/index.ts
  export { useWhatsAppBlast } from "./use-whatsapp-blast";
  export { usePollWhatsAppQr } from "./use-poll-whatsapp-qr";
  export { useWhatsAppBlastActions } from "./use-whatsapp-blast-actions";
  ```

  ```tsx
  // ✅ CORRECT — import from barrel
  import { useWhatsAppBlastActions } from "./usecases";

  // ❌ WRONG — import from specific file path
  import { useWhatsAppBlastActions } from "./usecases/use-whatsapp-blast-actions";
  ```

- **If the usecase grows complex** (multiple interfaces/types, constants, or utility functions), split into a folder:

  ```
  usecases/
    use-some-usecase/
      index.ts
      use-some-usecase.ts
      types.ts
      constants.ts
      utils.ts
  ```

### 2d. **Extracting Sub-Components from Large Renders**

If a component's JSX return has clearly separable UI sections (modals, list items, form sections), **extract each into its own component folder**:

```
src/components/modules/whatsapp-blast/
  index.ts
  WhatsAppBlast.tsx
  styles.ts
  types.ts
  usecases/
    use-whatsapp-blast-actions.ts
    use-whatsapp-blast.ts
    use-poll-whatsapp-qr.ts
  components/
    index.ts                       ← barrel re-export
    qr-code-modal/
      index.ts
      QrCodeModal.tsx
      styles.ts
      types.ts
    phone-number-list/
      index.ts
      PhoneNumberList.tsx
      styles.ts
      types.ts
    phone-number-item/
      index.ts
      PhoneNumberItem.tsx
      styles.ts
      types.ts
    message-template-editor/
      index.ts
      MessageTemplateEditor.tsx
      styles.ts
      types.ts
```

Benefits:
- Each sub-component owns its own state, reducing re-renders of the parent.
- Props passed to sub-components are explicit (no prop-drilling through a single monster component).
- Each sub-component can be tested in isolation.

### 2e. **Barrel Imports for Sub-Components**

All sub-components under `components/` **MUST** have a `components/index.ts` barrel file that re-exports every sub-component:

```ts
// components/index.ts
export { QrCodeModal } from "./qr-code-modal";
export { PhoneNumberList } from "./phone-number-list";
export { PhoneNumberItem } from "./phone-number-item";
export { MessageTemplateEditor } from "./message-template-editor";
```

The parent component then imports from the barrel in a single tidy line:

```ts
// ✅ CORRECT — single import line
import { QrCodeModal, PhoneNumberList, MessageTemplateEditor } from "./components";

// ❌ WRONG — multiple separate import lines
import { QrCodeModal } from "./components/qr-code-modal";
import { PhoneNumberList } from "./components/phone-number-list";
```

Sub-components that import sibling sub-components also use the barrel:

```ts
// Inside phone-number-list/PhoneNumberList.tsx
import { PhoneNumberItem } from "../phone-number-item";  // resolves to index.ts
```

## 3. **Styling (Panda CSS)**

- Import `css` from `@styled-system/css`.
- All styles in `styles.ts` — **never inline**.
- Use object-literal syntax with BEM-like nesting for child elements.
- Use Panda CSS shorthands (`bg`, `p`, `m`, `w`, `h`, `br`).
- Use `token()` for composite values.
- Use `data-attributes` for state styling (`&[data-selected="true"]`), not CSS classes.

## 4. **Hooks**

- Custom hooks in `src/hooks/` follow the same folder pattern if they have local types.

### 4a. **Using React Query (Custom Project Wrapper)**

**NEVER use raw `fetch` + `setInterval` for polling** — always use the project's custom `useQuery` hook with `refetchInterval`:

```tsx
import { useQuery } from "@/hooks/react-query";

// ✅ CORRECT: Use custom useQuery with refetchInterval for polling
const { data, isLoading } = useQuery({
  queryKey: ["whatsapp-qr"],
  queryFn: async () => {
    const response = await fetch("/api/whatsapp/qr");
    const body = await response.json();
    return body;
  },
  refetchInterval: 5000,   // poll every 5s
  enabled: !isReady,        // stop polling when condition met
});
```

When the endpoint **fits the versioned API pattern** (`/api/v1/...`), use `fetcherQuery` via meta:

```tsx
import { useQuery } from "@/hooks/react-query";

useQuery({
  queryKey: ["profile"],
  meta: { apiVersion: "2" },
});
```

When the endpoint **is mounted under the server's own `/api/*`** (like WhatsApp endpoints), provide a manual `queryFn` that fetches directly — still using the custom `useQuery` wrapper for consistent error typing.

### 4b. **Using React Query (Custom Mutation Wrapper)**

**NEVER use raw `fetch` for mutations** — always use the custom `useMutation` hook:

```tsx
import { useMutation } from "@/hooks/react-query";

const { mutate, isPending } = useMutation({
  mutationFn: async ({ phoneNumbers, groupLink, messageTemplate }) => {
    const response = await fetch("/api/whatsapp/blast/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumbers, groupLink, messageTemplate }),
      credentials: "include",
    });
    if (!response.ok) {
      const body = await response.json();
      throw new Error(body?.errors ? Object.values(body.errors).join("; ") : "Request failed");
    }
    return response.json();
  },
});
```

When the endpoint **fits the versioned API pattern**, use `fetcherMutation`:

```tsx
import { fetcherMutation } from "@/utils/react-query";

useMutation({
  mutationFn: fetcherMutation,
  context: { path: "auth/login", method: "POST", apiVersion: "2" },
});
```

### 4c. **Never Poll Manually**

❌ **WRONG** — do NOT use `setInterval` + raw `fetch`:
```tsx
useEffect(() => {
  const interval = setInterval(async () => {
    const r = await fetch("/api/whatsapp/qr");
    // ...manual state updates...
  }, 5000);
  return () => clearInterval(interval);
}, []);
```

✅ **CORRECT** — use `useQuery` with `refetchInterval`:
```tsx
const { data } = useQuery({
  queryKey: ["whatsapp-qr"],
  queryFn: async () => {
    const r = await fetch("/api/whatsapp/qr");
    return r.json();
  },
  refetchInterval: 5000,
  enabled: condition,
});
```

## 5. **Import Order (Frontend Files)**

Imports **MUST** be in exactly this order, with blank lines between sections:

### Section 1: 3rd party libraries
```ts
import { useState } from "react";
import { cx } from "@styled-system/css";
```

### Section 2: Internal package libs (`@/...`)
```ts
import { useQuery } from "@/hooks/react-query";
import type { ApiError } from "@/models/api";
```

### Section 3: Relative imports — strict path-depth sort

Within a section, imports are sorted by path depth (shallower paths first):

```
../../outer-outer-local    ← deepest first, actually
../outer-local
./local
```

**Within the same depth**, the order is:
1. Regular value imports
2. `import type` imports
3. `import {} from './styles'` (always last)

```ts
// ../../ depth
import { normalizePhoneNumber } from "../../../../utils/phone";

// ../ depth
import type { PhoneNumberEntry, BlastProgress } from "../types";

// ./ depth — value imports first
import { useWhatsAppBlast } from "./usecases/use-whatsapp-blast";
// ./ depth — type imports next
import type { PhoneNumberItemProps } from "./types";
// ./ depth — styles always at the very bottom
import { phoneNumberItemCss } from "./styles";
```

**Note**: `import type` and `./styles` are sorted by path just like value imports (they're grouped by depth, then ordered as: values → types → styles).

## 6. **Type Imports**

Always use `import type` for type-only imports:
```ts
import type { PhoneNumberEntry } from "./types";
```

## 7. **State Management**

- Prefer local state (`useState`/`useReducer`) for component-specific state.
- Use React Query for server state.
- Use context only for truly global state.

## 8. **Testing**

- All new features covered by tests.
- Tests placed alongside the module or in `__tests__/`.
- Cover edge cases and error states.