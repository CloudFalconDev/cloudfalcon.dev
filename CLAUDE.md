# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run Biome linter
npm run format   # Format code with Biome
npm run check    # Run Biome lint + format check
```

Dependency management:
```bash
npm run check-latest   # Check for available updates
npm run force-latest   # Update all dependencies to latest
```

## Tech Stack

- **Next.js 16** with App Router (`/app` directory)
- **React 19** with TypeScript
- **Tailwind CSS v4** (CSS-based config in `globals.css` with `@theme` directive)
- **Framer Motion** for animations
- **Three.js** for 3D geometric background
- **Radix UI** for accessible dropdown menus
- **Lucide React** for icons
- **Biome** for linting and formatting (`biome.json`)

## Architecture

### Page Structure
- `app/page.tsx` - Main landing page, composes section components
- `app/kubernetes/page.tsx` - Kubernetes tools subpage
- `app/terraform/page.tsx` - Terraform tools subpage
- `app/security/page.tsx` - Security tools subpage
- `app/layout.tsx` - Root layout with Geist fonts

### Component Pattern
Major landing page sections are implemented as dedicated components in `components/`:
- `ServicesSection.tsx`, `PlatformsSection.tsx`, `IaCToolsSection.tsx`
- `ServicesAutomationSection.tsx`, `PricingSection.tsx`
- `Header.tsx`, `Footer.tsx`, `MainNav.tsx`

**Convention**: New sections should be created as separate components and imported into `app/page.tsx`.

### Data Layer
Tool/service data lives in `data/` directory:
- `serviceDetails.tsx` - Service offerings data
- `kubernetesTools.tsx`, `terraformTools.tsx`, `securityTools.tsx` - Tool listings
- `iacTools.ts` - Infrastructure as Code tools

### Utilities
- `lib/utils.ts` - Contains `cn()` function for class name merging (clsx + tailwind-merge)
- `components/ui/` - Reusable UI primitives (Button, Input) using class-variance-authority

### Static Assets
- `public/img/svg/` - SVG logos (AWS, Azure, GCP, etc.)
- `public/img/png/` - PNG logos and images
- `app/fonts/` - Geist variable fonts

## Tailwind CSS v4 Configuration

Theme configuration is in `app/globals.css` using the `@theme` directive:
```css
@import "tailwindcss";

@theme {
  --color-background: hsl(var(--background));
  --color-primary: hsl(var(--primary));
  /* ... */
}
```

CSS variables for light/dark modes are defined in `:root` and `.dark` selectors.

## Git Hooks

Pre-commit hooks via Husky + lint-staged auto-run Biome on staged files:
- `.husky/pre-commit` - Runs `npx lint-staged`
- Configured in `package.json` under `lint-staged`

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
- Keeping GitHub Actions Up to Date
- Requires [Renovate GitHub App](https://github.com/apps/renovate) installed

## Deployment

Deployed on Netlify (see badge in README). Static pages are prerendered at build time.
