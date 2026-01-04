# CloudFalcon

[![Netlify Status](https://api.netlify.com/api/v1/badges/b1673ddf-4174-496d-ac47-348f839d759f/deploy-status)](https://app.netlify.com/sites/cloudfalcondev/deploys)

> **📚 Documentation**: See [`docs/`](./docs/) folder for detailed guides:
>
> - [`docs/AGENTS.md`](./docs/AGENTS.md) - AI agent guidance and project structure
> - [`docs/POSTHOG_REVIEW.md`](./docs/POSTHOG_REVIEW.md) - PostHog integration review

## Quick Start

Create `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### MCP Configuration

MCP (Model Context Protocol) servers are configured in `.cursor/mcp.json` for Cursor IDE (project-specific) or `.mcp.json` for other MCP clients. To use them, set the following environment variables in your system or MCP client configuration:

- **GitHub**: `GITHUB_PERSONAL_ACCESS_TOKEN` - Create a token at <https://github.com/settings/tokens>
- **Sanity**: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` - Get from your Sanity project settings
- **Netlify**: `NETLIFY_AUTH_TOKEN` - Get from <https://app.netlify.com/user/applications/personal>

Note: MCP environment variables are separate from Next.js environment variables and should be set in your system environment or MCP client configuration.

```bash
npm install
npm run dev
```

- Open [localhost:3000](http://localhost:3000)
- Open [localhost:3000/studio](http://localhost:3000/studio)

## Tech Stack

- Next.js 16 • React 19 • TypeScript • Tailwind CSS v4
- Sanity CMS • Biome • Vitest
