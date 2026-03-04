# AGENTS.md - Coding Guidelines for Agentic AI

This document provides comprehensive guidelines for software engineering agents working on this Astro + TypeScript project. It covers build/test commands, code style conventions, and development workflows.

## Project Overview

- **Framework**: Astro 5.7.12 with TypeScript
- **Internationalization**: Full i18n support with subdirectory routing
- **Linting/Formatting**: Biome 1.9.4
- **Testing**: Vitest 4.0.0
- **Package Manager**: pnpm 10.29.3

## Browser Automation Tools

This project provides access to MCP-based browser automation tools for web testing, scraping, and interaction. These tools enable agents to interact with web pages programmatically.

### Available Browser Tools

- **`browsermcp_browser_navigate`** - Navigate to URLs and capture page snapshots
- **`browsermcp_browser_screenshot`** - Capture visual screenshots of web pages
- **`browsermcp_browser_click`** - Click on page elements by reference
- **`browsermcp_browser_hover`** - Hover over elements
- **`browsermcp_browser_type`** - Type text into form fields
- **`browsermcp_browser_select_option`** - Select dropdown options
- **`browsermcp_browser_press_key`** - Press keyboard keys
- **`browsermcp_browser_wait`** - Wait for specified time periods
- **`browsermcp_browser_get_console_logs`** - Retrieve browser console output
- **`browsermcp_browser_go_back`** - Navigate to previous page
- **`browsermcp_browser_go_forward`** - Navigate to next page
- **`browsermcp_browser_snapshot`** - Capture accessibility snapshot of current page

### Usage Guidelines

- Use browser tools for web testing, content verification, and automation
- Always provide descriptive element names when clicking or interacting
- Take screenshots to document visual states during testing
- Use console logs to debug JavaScript errors and warnings
- Respect robots.txt and website terms of service when scraping

### Testing with Browser Tools

Browser tools can be used to:
- Verify website functionality after deployments
- Test internationalization across different locales
- Capture visual regressions
- Automate form submissions and user flows
- Monitor console errors in production

### Security Notes

- Browser tools operate in isolated environments
- No sensitive data is stored between sessions
- Tools respect standard web security policies

## Build, Lint, and Test Commands

### Full Build Pipeline
```bash
pnpm run build    # astro check && astro build
```
Runs type checking and builds the production bundle.

### Type Checking Only
```bash
pnpm run check    # astro check && biome check --write .
```
Validates TypeScript types and runs Biome linting with auto-fixes.

### Testing
```bash
pnpm run test           # vitest run (single run)
pnpm run test:watch     # vitest (watch mode)
```

### Running a Single Test File
```bash
# Run specific test file
npx vitest run src/path/to/__tests__/file.test.ts

# Run tests matching a pattern
npx vitest run --reporter=verbose "**/i18n.test.ts"
```

### Development Server
```bash
pnpm run dev       # astro dev
pnpm run start     # astro dev --open
pnpm run preview   # astro preview
```

## Code Style Guidelines

### Imports and Modules

**Path Aliases:**
- `@/*` → `src/*`
- `@i18n` → `src/i18n/index.ts`
- `@components/*` → `src/components/*`

**Import Organization:**
- Use named exports over default exports
- Group imports: external libraries first, then internal modules
- Biome automatically organizes imports (`organizeImports.enabled: true`)

```typescript
// Good
import { useTranslations, type Lang } from "@/i18n";
import { SITE_TITLE } from "@/consts";

// Avoid default exports
export { useTranslations } from "./i18n";
```

### Formatting

**Biome Configuration:**
- Indentation: Tabs (not spaces)
- Quote style: Double quotes (`"`)
- Line endings: Auto-detected
- Max line width: Default (Biome handles this)

**Consistent Formatting:**
- Let Biome handle all formatting decisions
- Run `biome check --write .` before commits
- No manual formatting adjustments

### TypeScript Configuration

**Strict Mode:**
- `strictNullChecks: true` - Always check for null/undefined
- Full strict mode enabled via `astro/tsconfigs/strict`

**Type Definitions:**
- Define interfaces/types in dedicated `.ts` files
- Use branded types for domain-specific strings
- Export types for component props

```typescript
// types.ts
export interface LocaleConfig {
  readonly label: string;
  readonly lang?: string;
  readonly dir?: "ltr" | "rtl";
  readonly flag?: string;
}

export type Lang = keyof typeof LOCALES;
```

**Type Safety:**
- Avoid `any` type - use proper unions or generics
- Use `const` assertions for literal types
- Leverage Astro's type inference for frontmatter

### Naming Conventions

**Variables and Functions:**
- camelCase: `useTranslations`, `getLocalePaths`
- Boolean variables: `isEnabled`, `hasContent`
- Event handlers: `handleSubmit`, `onLanguageChange`

**Types and Interfaces:**
- PascalCase: `Multilingual`, `UIDict`, `LocaleConfig`
- Suffix interfaces descriptively: `UserConfig`, `ApiResponse`

**Files and Directories:**
- kebab-case: `i18n-utils.ts`, `locale-select.astro`
- PascalCase for components: `Header.astro`, `LocaleSelect.tsx`
- `__tests__/` directories for test files

**Constants:**
- SCREAMING_SNAKE_CASE for true constants
- camelCase for computed constants

### Error Handling

**Null Safety:**
- Use nullish coalescing (`??`) for fallbacks
- Optional chaining (`?.`) for safe property access
- Explicit null checks in conditionals

```typescript
// Good
const translation = ui[lang]?.[key] ?? ui[DEFAULT_LOCALE]?.[key] ?? key;

// Avoid
const translation = ui[lang][key] || ui[DEFAULT_LOCALE][key] || key;
```

**Translation Fallbacks:**
- Primary language → Default locale → Key itself
- Empty string for missing multilingual content
- Graceful degradation in i18n functions

**Type Guards:**
- Use type guards for runtime type checking
- Narrow types with conditional logic
- Avoid `as` assertions when possible

### Testing with Vitest

**Test Structure:**
- Test files: `**/__tests__/**/*.test.ts`
- Setup file: `vitest.setup.ts` (if exists)
- Globals enabled: `describe`, `test`, `expect`, `vi`

**Mocking:**
- Use `vi.mock()` for module mocking
- Mock external dependencies and APIs
- Reset mocks between tests with `beforeEach`

```typescript
// Good test pattern
describe("useTranslations", () => {
  test("returns translation for string key in specified language", () => {
    const t = useTranslations("es");
    expect(t("hello")).toBe("Hola");
  });
});
```

**Test Coverage:**
- Test happy paths and error cases
- Mock complex dependencies
- Test i18n functionality thoroughly
- Use descriptive test names

### Astro-Specific Patterns

**Frontmatter Scripts:**
- Import utilities and types at top
- Define page-specific logic
- Export props for dynamic routes

```astro
---
// src/pages/[lang]/about.astro
import { useTranslations, type Lang } from "@/i18n";
import type { GetStaticPaths } from "astro";

export const getStaticPaths = async () => { /* ... */ };

const { lang } = Astro.params;
const t = useTranslations(lang as Lang);
---

<html lang={lang}>
  <title>{t("about.title")}</title>
</html>
```

**Component Props:**
- Type props interfaces explicitly
- Use Astro's built-in TypeScript support
- Handle optional props safely

**Internationalization:**
- Use `useTranslations()` hook for UI strings
- Support `Multilingual` objects for content
- Fallback to default locale automatically

### File Organization

**Directory Structure:**
```
src/
├── components/     # Reusable Astro/React components
├── i18n/          # Internationalization logic
│   ├── __tests__/ # i18n tests
│   ├── translations/ # Translation files
│   └── types.ts   # i18n type definitions
├── layouts/       # Page layouts
├── pages/         # Route pages
└── consts.ts      # Application constants
```

**Content Collections:**
- Use Astro's content collections for blog posts
- Define schemas in `content.config.ts`
- Type-safe content queries

## Development Workflow

### Pre-commit Checks
1. Run type checking: `pnpm run check`
2. Run tests: `pnpm run test`
3. Format code: Biome auto-fixes on check

### Adding New Features
1. Update types first (`src/i18n/types.ts`)
2. Implement functionality with tests
3. Add i18n strings to translation files
4. Update components and pages
5. Verify build passes

### Internationalization Workflow
1. Add new keys to `src/i18n/ui.ts`
2. Update all language objects
3. Use `useTranslations()` in components
4. Test fallback behavior

### Commit Message Guidelines
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `refactor:` - Code restructuring
- `test:` - Test-related changes
- `i18n:` - Internationalization updates

Example: `feat: add language switcher component`

## Additional Notes

- Always run `pnpm run check` before pushing changes
- Test i18n functionality across all supported locales
- Use Biome for consistent code formatting
- Follow TypeScript strict mode requirements
- Maintain test coverage for new code

This document should be updated when coding patterns or tools change.