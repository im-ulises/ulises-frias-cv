# Ulises Frías — AI Builder & Founder

Premium recruiter-facing CV and portfolio site built with React, Vite and TypeScript.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The generated static site is written to `dist/`.

## Cloudflare Pages

Create a Pages project connected to this GitHub repository with:

- Framework preset: **Vite**
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20` or newer

The repository includes `public/_redirects` so the client-side `/resume` route works on direct navigation and refresh. `public/_headers` adds baseline security headers and long-lived caching for hashed assets.

For a custom domain, update the canonical URL in `index.html` and the sitemap URL in `public/robots.txt` / `public/sitemap.xml` before the production launch.
