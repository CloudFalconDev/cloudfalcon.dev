# AGENTS.md

Guidance for AI coding agents working with this repository.

## Quick Start

```bash
pnpm install         # Install dependencies
pnpm dev             # Start dev server (http://localhost:3000)
pnpm check           # Lint + format + type check
pnpm build           # Production build
```

## Tech Stack

- **Next.js 16** - App Router, React Server Components
- **React 19** - UI framework
- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - Styling (`@theme` in `app/globals.css`)
- **Sanity CMS** - Content management (blog & docs)
- **Biome** - Linting & formatting (replaces ESLint/Prettier)
- **Vitest** - Testing framework

## Content Management

**Blog & Docs are managed in Sanity CMS**, not in markdown files.

- **Sanity Studio**: `/studio` route ([http://localhost:3000/studio](http://localhost:3000/studio))
- **Schemas**: `schemas/blog.ts`, `schemas/doc.ts`
- **Client**: `lib/sanity.ts` - Sanity client and queries
- **Content loading**: `lib/content.ts` - Fetches from Sanity
- **Rendering**: `components/content/PortableText.tsx` - Renders Sanity Portable Text (server component)
- **Static generation**: blog posts and docs pages use `generateStaticParams` + `revalidate = 60`,
  so every page is prerendered at build time and refreshed in the background (ISR).
  Don't add request-time APIs (cookies, headers, server-side analytics) to these pages;
  record views in the browser with `TrackView` instead.
- **Layouts**: `app/docs/layout.tsx` and `app/blog/layout.tsx` hold the header, footer and
  docs sidebar, so navigation only swaps the page content
- **Content quirks**: imported content stores links as objects inside span `marks`;
  `normalizeMarks()` in `lib/content.ts` converts them, otherwise links render hidden

## Code Style

- **Formatting**: Biome with tab indentation
- **Quotes**: Double quotes for JS/TS
- **TypeScript**: Avoid `any`, use `unknown` instead
- **Components**: Prefer server components, use `"use client"` only when needed
- **CSS**: Tailwind utilities, semantic variables in `globals.css`

## Project Structure

```text
app/                    # Next.js pages (App Router)
  blog/                 # Blog posts (from Sanity)
  docs/                 # Documentation (from Sanity)
  studio/               # Sanity Studio UI
src/                    # Source code
  components/           # React components
    layout/            # Layout components (Header, Footer, MainNav, Logo, ErrorBoundary)
    content/           # Content rendering (PortableText, ContentImage, DocsSidebar, StatusMessage)
    sections/          # Landing page sections (Hero, then DocSection-based Audience, Tracks, Stack, HowItWorks, Pricing, BookCall)
    features/          # Client islands (BookCallButton opens Calendly, TrackedLink/TrackView record PostHog events)
    ui/                # UI primitives (button, input, accordion, etc.)
  hooks/               # React hooks
    useIsMobile.ts     # Mobile detection hook
    usePrefersReducedMotion.ts  # Reduced motion preference hook
  data/                # Static page content (tracks, plans, audiences, steps, stack, roadmap, hero)
  lib/                 # Utilities
    analytics.ts       # track(): lazy-loaded PostHog capture
    booking.ts         # Calendly popup, script loaded on first click
    contact.ts         # Contact email and prefilled mailto link
    dates.ts           # UTC date formatting for posts and docs
    styles.ts          # Shared class names (container, buttons)
    content.ts         # Content fetching from Sanity
    sanity.ts          # Sanity client & queries
  schemas/             # Sanity schemas (blog, doc, category)
  types/               # TypeScript type definitions
```

## Important Conventions

1. **Content**: Blog/docs come from Sanity, not filesystem
2. **Components**: New sections → separate component files
3. **Data**: Static data in `data/` directory
4. **Styling**: Tailwind classes, semantic CSS variables
5. **Type safety**: No `any` types, proper null checks

## Common Commands

```bash
pnpm dev                 # Development server
pnpm build               # Production build
pnpm check               # Lint + format + type check
pnpm test                # Run tests
pnpm test:ui            # Run tests with UI
pnpm test:coverage      # Run tests with coverage report
```

## Testing

Tests use **Vitest** with **Testing Library React**:

- **Test files**: `*.test.ts` or `*.test.tsx` alongside source files
- **Test utilities**: `src/lib/__tests__/test-utils.tsx` - Custom render and mocks
- **Mocks**: `src/lib/__tests__/mocks/` - Next.js, Sanity, and window API mocks
- **Coverage**: Configured with v8 provider, 80% threshold

### Writing Tests

```typescript
import { describe, expect, it } from "vitest";
import { render, screen } from "@/lib/__tests__/test-utils";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("should render button", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### Test Structure

- **UI Components**: Test rendering, variants, interactions
- **Hooks**: Test state changes and side effects
- **Utilities**: Test function logic and edge cases

## CI/CD

GitHub Actions runs on push/PR:

1. `pnpm install --frozen-lockfile` - Install dependencies
2. `pnpm lint` - Biome linting
3. `pnpm build` - Production build
4. `pnpm test` - Run tests with coverage
5. Lighthouse CI - Performance audits (automated in CI)

## Analytics & Monitoring

### PostHog Integration

**PostHog** is integrated for product analytics and error tracking.

**Implementation**:

- **Client-side**: Initialized via `instrumentation-client.ts` (Next.js 15.3+ approach)
  - Uses dynamic import to ensure client-side only execution
  - Configured with reverse proxy (`/ingest`) to bypass ad blockers
  - Exception capture enabled for automatic error tracking
- **Server-side**: Initialized via `src/lib/posthog-server.ts` using `posthog-node`
  - Graceful shutdown handlers in `instrumentation.ts`
  - Returns `null` if key is missing (doesn't crash the app)

**Configuration**:

- **Environment Variables**:
  - `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key (required)
  - `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL (optional, defaults to `https://us.i.posthog.com`)

**Reverse Proxy**:

PostHog requests are proxied through Next.js to bypass ad blockers:

- `/ingest/static/*` → `https://us-assets.i.posthog.com/static/*`
- `/ingest/*` → `https://us.i.posthog.com/*`

Configured in `next.config.mjs` with `rewrites()`.

**Event Tracking**:

Custom events are tracked throughout the application:

- `booking_terminal_opened` - User opens the Calendly booking popup (name kept from the old booking terminal so dashboards keep working; `source` says which button)
- `contact_connect_clicked` - User clicks the contact email
- `pricing_tier_contact_clicked` - User starts booking from a pricing plan, or emails about team mentorship
- `social_link_clicked` - User clicks social media link
- `blog_post_viewed` - User views blog post (sent from the browser by `TrackView`)
- `error_boundary_triggered` - Error caught by ErrorBoundary
- `docs_error_occurred` - Error in docs page
- `blog_error_occurred` - Error in blog post
- `not_found_page_viewed` - 404 page viewed (sent from the browser by `TrackView`)

**Usage**:

```typescript
// Client-side (in client components); PostHog is imported lazily
import { track } from "@/lib/analytics";

void track("event_name", {
  property1: "value1",
  property2: "value2",
});

// For links, prefer the TrackedLink component
// <TrackedLink href="..." event="event_name" properties={{ ... }}>...</TrackedLink>

// Server-side (in server components/API routes)
import { getPostHogClient } from "@/lib/posthog-server";

const posthog = getPostHogClient();
if (posthog) {
  posthog.capture({
    distinctId: "user-id",
    event: "event_name",
    properties: { property1: "value1" },
  });
}
```

**Files**:

- `instrumentation-client.ts` - Client-side initialization
- `instrumentation.ts` - Server-side shutdown handlers
- `src/lib/posthog-server.ts` - Server-side PostHog client
- `next.config.mjs` - Reverse proxy configuration
