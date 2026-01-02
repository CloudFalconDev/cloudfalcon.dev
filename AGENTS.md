# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Setup commands

- Install dependencies: `npm install`
- Start development server: `npm run dev` (runs at http://localhost:3000)
- Build for production: `npm run build`
- Run production build: `npm run start`

## Code quality commands

- Format code: `npm run format` (Biome formats JS/TS/JSON/CSS)
- Lint code: `npm run lint` (Biome lints JS/TS/JSON/CSS)
- Check everything: `npm run check` (Biome check + TypeScript type check)
- Type check: `npm run type-check`
- Run tests: `npm run test`
- Test with UI: `npm run test:ui`
- Test coverage: `npm run test:coverage`

## Performance testing commands

- Run Lighthouse: `npm run lighthouse` (Desktop test, opens HTML report)
- Lighthouse mobile: `npm run lighthouse:mobile` (Mobile preset)
- Lighthouse desktop: `npm run lighthouse:desktop` (Desktop preset)
- Lighthouse CI: `npm run lighthouse:ci` (Console output with thresholds)

**Note**: Start dev server (`npm run dev`) before running Lighthouse tests.

## Dependency management

- Check for updates: `npm run check-latest`
- Update all dependencies: `npm run force-latest`

## Code style

- **TypeScript**: Strict mode enabled (`tsconfig.json`)
- **Formatting**: Biome with tab indentation
- **Linting**: Biome (replaces ESLint, Prettier, Stylelint)
- **Quotes**: Double quotes for JavaScript/TypeScript
- **Imports**: Auto-organized by Biome
- **CSS**: Tab indentation, Tailwind CSS v4 syntax

### TypeScript conventions

- Use strict mode (`noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`)
- Avoid `any` types (use `unknown` instead)
- Use exhaustive dependencies in hooks (`useExhaustiveDependencies: warn`)
- Hooks must be at top level (`useHookAtTopLevel: error`)
- Use Node.js import protocol (`useNodejsImportProtocol: error`)
- Use type imports (`useImportType: error`)

### Component patterns

- New sections should be separate components in `components/`
- Import section components into `app/page.tsx`
- Components with list data should import from `data/` directory
- Use `React.memo` for static components when appropriate
- Prefer client components (`"use client"`) only when needed

### CSS conventions

- Use Tailwind CSS v4 with `@theme` directive in `app/globals.css`
- CSS variables defined in `:root` (light) and `.dark` (dark mode)
- Use semantic color variables (`--color-background`, `--color-primary`, etc.)
- Support `prefers-reduced-motion` for accessibility
- Mobile optimizations in media queries (`@media (width <= 768px)`)

## Testing instructions

- Run all tests: `npm run test`
- Run specific test: `npm run test -t "<test name>"`
- Test coverage: `npm run test:coverage`
- Tests are in `lib/__tests__/` directory
- Use Vitest + React Testing Library
- Fix any test or type errors before committing

## Build and deployment

- Production build: `npm run build`
- Static pages are prerendered at build time
- Deployed on Netlify
- CI/CD runs on push/PR to main:
  1. `npm ci` - Install dependencies
  2. `npm run lint` - Biome linting
  3. `npm run build` - Production build

## Project structure

### Pages (`app/`)

- `app/page.tsx` - Main landing page, composes section components
- `app/layout.tsx` - Root layout with Geist fonts
- `app/blog/[...slug]/page.tsx` - Blog posts
- `app/docs/[[...slug]]/page.tsx` - Documentation pages
- `app/globals.css` - Global styles and Tailwind theme

### Components (`components/`)

Major sections:
- `ServicesSection.tsx`, `PlatformsSection.tsx`, `IaCToolsSection.tsx`
- `IntegrationsSection.tsx`, `PricingSection.tsx`
- `Header.tsx`, `Footer.tsx`, `MainNav.tsx`
- `GeometricBackground.tsx` - Three.js particle system
- `MarqueeSection.tsx` - Reusable marquee animation wrapper

UI primitives (`components/ui/`):
- `button.tsx`, `input.tsx`, `accordion.tsx`, `dropdown-menu.tsx`
- Uses `class-variance-authority` for variants

### Data (`data/`)

Tool/service data:
- `serviceDetails.tsx` - Service offerings
- `platforms.ts` - Cloud platforms (AWS, Azure, GCP, etc.)
- `integrations.ts` - Third-party integrations (Datadog, Vanta, etc.)
- `kubernetesTools.tsx`, `terraformTools.tsx`, `securityTools.tsx` - Tool listings
- `iacTools.ts` - Infrastructure as Code tools
- `pipelineSteps.ts` - CI/CD pipeline steps

### Utilities (`lib/`)

- `lib/utils.ts` - `cn()` function for class name merging (clsx + tailwind-merge)
- `lib/content.ts` - Content loading utilities (MDX, frontmatter)
- `lib/contact.ts` - Contact form handling
- `lib/useIsMobile.ts` - Mobile detection hook (uses matchMedia)
- `lib/device.ts` - Device detection utilities
- `lib/constants.ts` - Application constants
- `lib/threejs/particleSystem.ts` - Three.js particle system logic

### Static assets (`public/`)

- `public/img/svg/` - SVG logos (AWS, Azure, GCP, etc.)
- `public/img/png/` - PNG logos and images
- `app/fonts/` - Geist variable fonts (GeistVF.woff, GeistMonoVF.woff)

## Tech stack

- **Next.js 16** with App Router (`/app` directory)
- **React 19** with TypeScript
- **Tailwind CSS v4** (CSS-based config in `globals.css` with `@theme` directive)
- **Biome** - All-in-one linting and formatting (JS/TS/JSON/CSS)
- **Framer Motion** - Animations
- **Three.js** - 3D geometric background
- **Radix UI** - Accessible dropdown menus
- **Lucide React** - Icons
- **Vitest** - Testing framework
- **MDX** - Content (blog posts, documentation)

## Git hooks

Pre-commit hooks via Husky + lint-staged:
- `.husky/pre-commit` - Runs `npx lint-staged`
- Auto-formats and lints staged files (JS/TS/JSON/CSS) with Biome
- Configured in `package.json` under `lint-staged`

## Important conventions

1. **New sections**: Create separate component files, import into `app/page.tsx`
2. **Data**: Keep tool/service data in `data/` directory
3. **Styling**: Use Tailwind CSS classes, semantic CSS variables for colors
4. **Animations**: Respect `prefers-reduced-motion`, disable on mobile
5. **Performance**: Use `React.memo` for static components, optimize Three.js rendering
6. **Accessibility**: Use Radix UI primitives, proper ARIA attributes
7. **Type safety**: Avoid `any`, use `unknown` for frontmatter, add null checks for array access

## Common tasks

### Adding a new section

1. Create component in `components/` (e.g., `NewSection.tsx`)
2. Import data from `data/` if needed
3. Import and add to `app/page.tsx`
4. Use `MarqueeSection` wrapper if you need marquee animation

### Adding new data

1. Add to appropriate file in `data/` directory
2. Define TypeScript interfaces in `types/data.ts`
3. Import and use in components

### Styling

1. Use Tailwind utility classes
2. For custom styles, add to `app/globals.css`
3. Use semantic CSS variables (`--color-primary`, etc.)
4. Support dark mode via `.dark` selector

### Testing

1. Add tests in `lib/__tests__/` directory
2. Use Vitest + React Testing Library
3. Run `npm run test` before committing

## Before committing

- Run `npm run check` to ensure all checks pass
- Run `npm run test` if you added/changed tests
- Ensure TypeScript compiles (`npm run type-check`)
- Ensure Biome formatting is applied (`npm run format`)

## CI/CD

### GitHub Actions (`.github/workflows/ci.yml`)

Runs on push/PR to main:
1. `npm ci` - Install dependencies
2. `npm run lint` - Biome linting
3. `npm run build` - Production build

### Renovate (`.github/renovate.json`)

Automated dependency updates:
- Runs weekly (Mondays before 6am)
- Auto-merges patch/minor updates
- Requires [Renovate GitHub App](https://github.com/apps/renovate) installed
