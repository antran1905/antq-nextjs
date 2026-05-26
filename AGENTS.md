# AGENTS

## Principles
- Clarity and consistency over cleverness. Minimal changes. Match existing patterns.
- Keep components/functions short; break down when it improves structure.
- TypeScript everywhere; no `any` unless isolated and necessary.
- No unnecessary `try/catch`. Avoid casting; use narrowing.
- Named exports only (no default exports, except Next.js pages/layouts).
- Absolute imports via `@/` unless same directory.
- Follow existing ESLint setup; don't reformat unrelated code.
- Zod type-only: `import type * as z from 'zod';`.
- Let compiler infer return types unless annotation adds clarity.
- Options object for 3+ params, optional flags, or ambiguous args.
- Hypothesis-driven debugging: 1-3 causes, validate most likely first.

## Token Efficiency
- Skip recaps unless the result is ambiguous or you need more input.

## Commands
- Only use `pnpm run` scripts: `build-local`, `lint`, `check:types`, `check:deps`, `check:i18n`, `test`, `test:e2e`.

## Git Commits
- Conventional Commits: `type: summary` without scope. 
- Summary: Short, specific sentence explaining what changed and why.
- Types: `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`. 
- `BREAKING CHANGE:` footer when needed.
- Follow the commitlint conventional

## Env
- All env vars validated in `@/Env.ts`; never read `process.env` directly in application code.

## Styling & UI (Tailwind v4 + shadcn/ui)
- the main color is #00F0FF and #000000 and #F535AA
- Strictly use Tailwind utility classes.
- For UI components, always prioritize generating or reusing `shadcn/ui` components located in `@/components/atoms`.
- Do not modify `shadcn/ui` primitive files unless fundamentally changing the design system.
- Use `cn()` utility (clsx + tailwind-merge) for conditional class names.
- Keep components responsive (mobile-first approach).
- Images must be displayed in the background without being stretched
- **Semantic Colors Only:** Strictly use `shadcn/ui` semantic color variables for all UI elements. Use `bg-primary`, `text-primary-foreground`, `bg-muted`, `border-border`, `bg-destructive`, etc.
- **No Hardcoded Colors:** ABSOLUTELY NO arbitrary hex codes (e.g., `bg-[#ff0000]`) or raw Tailwind palette colors (e.g., `bg-blue-500`, `text-red-500`) in component files.
- **Dark Mode Compatibility:** Always rely on CSS variables (which automatically adapt to light/dark themes) rather than explicitly declaring dark mode classes (e.g., prefer `bg-background` over `bg-white dark:bg-black`).
- **Global Theme Definition:** Any new core brand colors must be defined as CSS variables in the global stylesheet (`index.css` or `globals.css`) under the `:root` and `.dark` selectors, mapped to Tailwind v4 `@theme`.
- **Opacity Modifiers:** Use Tailwind's opacity modifiers with semantic colors if transparency is needed (e.g., `bg-primary/50`, `text-foreground/70`).

## React
- No `useMemo` or `useCallback` (React Compiler handles optimization). Avoid `useEffect`.
- Single `props` param with inline type; access via `props.foo` (strictly no destructuring).
- Use `React.ReactNode`, not `ReactNode`.
- Inline short event handlers; extract only when complex.

## Pages
- Default export name ends with `Page`. Props alias ends with `PageProps`.
- Locale pages: `props: { params: Promise<{ locale: string }> }` → `await props.params` → `setRequestLocale(locale)`.
- Escape glob chars in shell commands for Next.js paths.
- Dashboard pages: Define meta once in layout, not per page.

## i18n (next-intl)
- Never hard-code user-visible strings. Page namespaces end with `Page`.
- Server: `getTranslations`. Client: `useTranslations`.
- Context-specific keys (`card_title`). Use `t.rich(...)` for markup.
- Use sentence case for translations.
- Error messages: Short, no "try again" variants.

## JSDoc
- Start each block with `/**` directly above the symbol.
- Short, sentence-case, present-tense description.
- Order: description → `@param` → `@returns` → `@throws`.

## Tests
- `*.test.ts` (unit), `*.spec.ts` (integration), `*.e2e.ts` (Playwright).
- Unit tests co-located with source. Integration/E2E in `tests/` directory.
- Top `describe` = subject; nested `describe` for scenarios.
- `it` titles: Short, third-person present, `verb + object + context`. No "should".
- Avoid mocking unless necessary.

## API Implementation
- Create interfaces in `@/interfaces` folder for request and response
- Extend existing interfaces if the new interface is related
- Implement API requests in `@/services` folder
- Always use:
  - `useQueryCustom` from `@/hooks/useQueryCustom.ts` for GET requests
  - `useMutationCustom` from `@/hooks/useMutationCustom.ts` for POST/PUT/DELETE requests
- Add query keys to `@/common/queryKeys.ts` when using `useQueryCustom` and reuse if it already exists
- Define request and response interfaces in `@/interfaces`.
- Use one shared Axios instance in `@/services/http.api.ts`. Do not create additional `axios.create(...)` instances in feature service files.
- Implement API request functions (axios/fetch wrappers) in `@/services` and consume the shared `httpApi` instance.
- Never call services directly inside components; always wrap them in custom React Query hooks.


## Components
- Use list components from `@/components` to ensure consistent UI
- Follow atomic design principles:
  - atoms: basic building blocks (buttons, inputs)
  - molecules: groups of atoms (form fields, cards)
  - organisms: groups of molecules (tables, forms)
  - templates: page layouts

## Enums and Types
- Create global enums in `@/common/enums.ts` if they're used across multiple components
- For component-specific enums, define them in the component file
- Use TypeScript types/interfaces for all props and state

## Custom Hooks
- Create custom hooks in the `@/hooks` folder
- Name hooks with 'use' prefix (e.g., `useQueryCustom`)
- Keep hooks focused on a single responsibility

## Routing
- Define new routes in `@/routers/index.tsx` under the `ROUTES_FE` object
- Follow the existing route structure with nested objects for related routes
- Use constant routes instead of hardcoded strings for navigation

## Utility Functions
- Create utility functions in the appropriate file in `@/utils` folder
- Organize by type/purpose (DateUtils, StringUtils, etc.)
- Import with the correct naming: `import DateTimeUtils from '@/utils/DateTimeUtils'`

## State Management
- Use React Query for server state management
- Use React Zustand for global UI state when needed in `src/stores`
- Use local state for component-specific state

## Error Handling
- Implement proper error handling in API calls
- Show user-friendly error messages using notifications or alerts
- Log errors appropriately for debugging

## Next.js App Router (Server vs Client)
- **Default to Server Components:** All components are Server Components by default.
- **`"use client"` placement:** Only add `"use client"` at the top of files that use React hooks (`useState`, `useQueryCustom`), event listeners (`onClick`), or browser APIs.
- **Push Client Components down the tree:** Keep `"use client"` components as deep/leaf nodes in the component tree as possible to minimize client bundle size.
- **Never import Server Components into Client Components:** Pass Server Components as `children` or `props` instead.
- Use `loading.tsx` and `error.tsx` for route-level boundaries.

## Data Fetching & Mutations
- **Server-Side Fetching:** For initial page load or SEO-critical data, fetch directly in Server Components using native `fetch` with Next.js caching/revalidate tags.
- **Client-Side Fetching:** Use `@/hooks/useQueryCustom` for dynamic user data, polling, or client-side interactions.
- **Server Actions:** Use Server Actions (with `"use server"`) ONLY for form submissions or strictly server-side mutations. Otherwise, default to `useMutationCustom` via REST APIs.

## Agentic Guardrails & Security
- **No Hallucinated Packages:** DO NOT use or import third-party npm packages unless they are already present in `package.json`.
- **UI Components:** Before building a custom UI element, check if a similar primitive exists in `@/components`.
- **Secrets:** Never log sensitive user data, tokens, or environment variables to the console.

## Naming Conventions
- **Next.js Reserved Files:** Strictly follow framework lowercase (e.g., `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`).
- **Directories:** Always use `kebab-case` (e.g., `@/components/auth-form`, `@/common/query-keys`).
- **React Components:** Use `PascalCase` for both filename and component name (e.g., `UserCard.tsx`, `SignInButton.tsx`).
- **Hooks:** Use `camelCase` with `use` prefix (e.g., `useQueryCustom.ts`, `useAuthStore.ts`).
- **Utils/Logic:** Use `camelCase` (e.g., `authService.ts`, `dateTimeUtils.ts`).
- **Services:** Use `kebab-case` (e.g., `user.api.ts`).
- **Types/Interfaces/Enums:** Use `kebab-case` (e.g., `user.type.ts`, `app.enums.ts`, `user.interface.ts`).
- **Test Files:** Match the source file name + suffix (e.g., `UserCard.test.tsx`, `authService.spec.ts`).
- **App Provider Directory:** Keep app-level provider wrappers under `@/provider` (e.g., `@/provider/AppProviders`).


## Linting & Code Quality
- **Zero Tolerance:** No `// eslint-disable`, `@ts-ignore`, or `@ts-nocheck` unless it's a documented framework bug. Always fix the underlying issue.
- **Import Sorting:** Organize imports in the following order:
  1. Built-in Node.js modules (`fs`, `path`).
  2. External libraries (`react`, `next`, `lucide-react`).
  3. Internal absolute paths (`@/components`, `@/hooks`, `@/utils`).
  4. Styles and types (`@/types`, `./styles.css`).
- **Tailwind Class Order:** Always follow the standard Tailwind CSS class order (use Prettier plugin sorting if available).
- **Unused Code:** Clean up all unused imports, variables, and dead code before submitting. 
- **Type Safety:** Ensure `bun run check:types` passes 100%. Never provide code that "works" but has type errors.
- **Accessibility (a11y):** Ensure components have proper ARIA labels and follow basic a11y linting rules.


## Performance
- Trust React Compiler for memoization. Keep Effects minimal and only for external synchronization.

## SEO & Accessibility (a11y)
- **Semantic HTML:** Strictly use semantic landmark tags (`<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<footer>`) instead of generic `<div>` soup.
- **Heading Hierarchy:** Maintain strict chronological heading order (`<h1>` down to `<h6>`). Ensure exactly ONE `<h1>` exists per page/route. Do not skip heading levels.
- **Media & Icons:** All `<img>` tags MUST have meaningful `alt` attributes. Empty `alt=""` is only allowed for purely decorative images. Icon-only buttons MUST have an `aria-label` or visually hidden text (`sr-only`).
- **Dynamic Meta:** Ensure document titles and meta tags are dynamically updated per route (using custom hooks or existing meta libraries) to support SPA indexing.

## Performance & Lighthouse (Web Vitals)
- **Prevent CLS (Cumulative Layout Shift):** ALWAYS explicitly define `width` and `height` attributes for `<img>`, or use Tailwind's aspect ratio utilities (`aspect-video`, `aspect-square`) to reserve layout space before the image loads.
- **Optimize LCP (Largest Contentful Paint):** Preload critical above-the-fold resources. Use `loading="lazy"` ONLY for images that are below the fold.
- **Code Splitting & Lazy Loading:** Use React's `lazy()` or React Router's lazy loading features for route-level components to minimize the initial JS bundle payload.
- **Tree-Shaking:** Import specific modules from libraries rather than the entire package (e.g., `import { format } from 'date-fns'` instead of `import dateFns from 'date-fns'`).
- **Interaction to Next Paint (INP):** Do not block the main thread. Defer heavy synchronous computations outside of the render cycle.
