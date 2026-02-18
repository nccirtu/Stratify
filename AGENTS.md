# Laravel Boost Guidelines for Agents

## 1. Build, Lint & Test Commands

- **Test (All):** `php artisan test --compact`
- **Test (Single File):** `php artisan test --compact tests/Feature/ExampleTest.php`
- **Test (Filter):** `php artisan test --compact --filter=testName`
- **Lint (PHP):** `vendor/bin/pint` (Run `vendor/bin/pint --dirty` before committing)
- **Lint (JS/TS):** `npm run lint` (ESLint)
- **Format (JS/TS):** `npm run format` (Prettier)
- **Build Frontend:** `npm run build` (Run if UI changes aren't reflecting)
- **Dev Server:** `npm run dev` or `composer run dev`

## 2. Core Mandates & Workflow

- **Laravel Boost:** This project uses Laravel Boost. Use the provided tools (`search-docs`, `tinker`, `browser-logs`, `list-artisan-commands`) extensively.
- **Search Docs:** **CRITICAL:** Always use `search-docs` to check for version-specific documentation (Laravel 12, Inertia v2, Pest v4, Tailwind v4) before implementing features.
- **Verification:** Do not create custom verification scripts. Write a Pest test (Unit/Feature/Browser) to prove functionality.
- **Conventions:** Follow existing project conventions. Check sibling files for structure and naming.

## 3. Code Style & Standards

### PHP (Laravel 12)

- **Formatting:** Strict adherence to Laravel Pint.
- **Types:** Use explicit return types and parameter type hints.
- **Constructors:** Use PHP 8 constructor property promotion.
- **Arrays:** Add PHPDoc array shape definitions where appropriate.
- **Enums:** TitleCase keys (e.g., `BestLake`).
- **Database:** Prefer Eloquent (`Model::query()`) over `DB::`. Prevent N+1 with eager loading.
- **Routes/Middleware:** Register in `bootstrap/app.php` (Laravel 11+ structure).

### React & Inertia (v2)

- **Navigation:** Use `<Link>` or `router.visit()`.
- **Forms:** Use the `<Form>` component or `useForm` helper.
- **Components:** Functional components. Place pages in `resources/js/Pages`.
- **Features:** Utilize Inertia v2 features like deferred props, infinite scrolling (`WhenVisible`), and prefetching.

### Tailwind CSS (v4)

- **Config:** CSS-first configuration via `@theme`. No `tailwind.config.js`.
- **Imports:** Use `@import "tailwindcss";`.
- **Dark Mode:** Use `dark:` variant.
- **Spacing:** Use `gap` utilities for spacing, avoid margins on children.

### Testing (Pest v4)

- **Framework:** Use Pest PHP. `php artisan make:test --pest {name}`.
- **Browser Tests:** extensive support for browser testing in `tests/Browser/`.
- **Assertions:** Use specific assertions (e.g., `assertForbidden`) over generic status checks.
- **Mocking:** Use `Pest\Laravel\mock`.

## 4. Useful Tools (Boost)

- `search-docs`: specific documentation search.
- `laravel-boost_tinker`: Execute PHP code in context.
- `laravel-boost_database-query`: Read-only SQL.
- `laravel-boost_browser-logs`: Debug frontend issues.
- `laravel-boost_get-absolute-url`: Generate correct URLs.

## 5. Wayfinder

- Generates TypeScript types for routes/controllers.
- Run `php artisan wayfinder:generate` after route changes.
- Import from `@/actions/...` or `@/routes/...` for type-safe routing.
- **Model Types:** Import generated model types from `@/wayfinder/types`.
  Example: `import { App } from '@/wayfinder/types'; type Props = { post: App.Models.Post };`

## 6. Cursor & Copilot Rules

- Additional detailed rules are located in `.cursor/rules/laravel-boost.mdc` and `.github/copilot-instructions.md`.
