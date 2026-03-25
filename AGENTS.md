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
- Only use `bun run` scripts: `build-local`, `lint`, `check:types`, `check:deps`, `check:i18n`, `test`, `test:e2e`.

## Git Commits
- Conventional Commits: `type: summary` without scope. 
- Summary: Short, specific sentence explaining what changed and why.
- Types: `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`. 
- `BREAKING CHANGE:` footer when needed.

## Env
- All env vars validated in `@/Env.ts`; never read `process.env` directly in application code.

## Styling
- Tailwind v4 utility classes. Reuse shared components. Responsive design. No unnecessary classes.

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

## Performance
- Trust React Compiler for memoization. Keep Effects minimal and only for external synchronization.