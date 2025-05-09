# CloudFalcon Next.js Landing Page

[![Netlify Status](https://api.netlify.com/api/v1/badges/b1673ddf-4174-496d-ac47-348f839d759f/deploy-status)](https://app.netlify.com/sites/cloudfalcondev/deploys)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure & Conventions

- **Major landing page sections** (e.g., Services, Platforms, IaC Tools, Services Automation, Pricing) are implemented as dedicated React components in the `components/` directory. These are imported and used in `app/page.tsx` for a modular, maintainable structure.
- **UI components** (buttons, inputs, etc.) are located in `components/ui/`.
- **Data** for sections (such as service details or IaC tools) is stored in the `data/` directory.
- **Utility functions** are in the `lib/` directory.
- **Assets** (images, fonts) are organized under the `public/img/` and `app/fonts/` directories.
- **Styling** is handled with [Tailwind CSS](https://tailwindcss.com/).
- **Animations** use [framer-motion](https://www.framer.com/motion/).
- **Icons** use [lucide-react](https://lucide.dev/).
- Project conventions and best practices are documented in the `.cursor/rules/` directory (see `project-structure.mdc`, `ui-components.mdc`, etc.).

> **Note:** To update or add a major section, create a new component in `components/` and import it in `app/page.tsx`.

## Fonts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
