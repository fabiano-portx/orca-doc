# PortX ORCA API Documentation

A static documentation website for the PortX ORCA Account Management API, built with [Eleventy](https://www.11ty.dev/) and [Stoplight Elements](https://github.com/stoplightio/elements).

## Features

- **Interactive API Reference** — Powered by Stoplight Elements with "Try It" functionality
- **Version Selector** — Switch between API versions with deprecated version warnings
- **Markdown Documentation** — Write docs in Markdown, rendered as styled HTML
- **PortX Branding** — Custom styling with PortX colors, fonts, and logo
- **Dark Mode** — Automatic dark theme based on system preference
- **Static Output** — Deploy anywhere: GitHub Pages, S3, Netlify, Vercel, or any CDN

## Project Structure

```
public-site/
├── .eleventy.js              # Eleventy configuration
├── package.json              # Dependencies and scripts
├── spec-releases/            # OpenAPI specification files (YAML)
│   ├── accounts-api-0.13.3.yaml   # Latest version
│   ├── accounts-api-0.13.2.yaml
│   └── ...
└── src/
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.njk      # Base HTML template
    │   │   ├── docs.njk      # Documentation page layout
    │   │   └── api.njk       # API reference layout (Stoplight)
    │   └── components/
    │       ├── nav.njk       # Navigation header
    │       └── footer.njk    # Page footer
    ├── _data/
    │   ├── site.json         # Site metadata (title, description)
    │   ├── versions.json     # API versions configuration
    │   └── navigation.json   # Documentation sidebar links
    ├── assets/
    │   ├── css/
    │   │   ├── variables.css # Design tokens (colors, fonts, spacing)
    │   │   ├── main.css      # Global styles
    │   │   └── api.css       # API page & Stoplight overrides
    │   ├── js/
    │   │   └── version-switcher.js  # Version dropdown logic
    │   └── images/
    │       └── favicon.svg
    ├── docs/                  # Markdown documentation pages
    │   ├── getting-started.md
    │   ├── authentication.md
    │   └── changelog.md
    ├── api/
    │   └── index.njk         # API Reference page
    └── index.njk             # Homepage
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18.x or later
- npm (included with Node.js)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

This launches a local server at **http://localhost:8080** with hot reload enabled.

### 3. Build for Production

```bash
npm run build
```

Generates static files in the `_site/` directory.

## Configuration

### Site Metadata

Edit `src/_data/site.json`:

```json
{
  "title": "PortX ORCA API",
  "description": "PortX ORCA Account Management API Documentation",
  "baseUrl": "",
  "contact": "betiana.darderes@portx.io"
}
```

### API Versions

Edit `src/_data/versions.json` to add or update API versions:

```json
[
  { "version": "0.13.3", "file": "accounts-api-0.13.3.yaml", "latest": true },
  { "version": "0.13.2", "file": "accounts-api-0.13.2.yaml" },
  { "version": "0.8.0", "file": "accounts-api-0.8.0.yaml", "deprecated": true }
]
```

- `latest: true` — Shown by default, gets "Latest" badge
- `deprecated: true` — Shows warning banner when selected

### Documentation Navigation

Edit `src/_data/navigation.json` to customize the docs sidebar:

```json
{
  "docs": [
    { "title": "Getting Started", "url": "/docs/getting-started/" },
    { "title": "Authentication", "url": "/docs/authentication/" },
    { "title": "Changelog", "url": "/docs/changelog/" }
  ]
}
```

## Adding Documentation

Create a new Markdown file in `src/docs/`:

```markdown
---
layout: layouts/docs.njk
title: My New Page
---

# My New Page

Your content here...
```

Then add it to `src/_data/navigation.json` to appear in the sidebar.

## Adding a New API Version

1. Add the OpenAPI spec file to `spec-releases/`:
   ```
   spec-releases/accounts-api-0.14.0.yaml
   ```

2. Update `src/_data/versions.json`:
   ```json
   [
     { "version": "0.14.0", "file": "accounts-api-0.14.0.yaml", "latest": true },
     { "version": "0.13.3", "file": "accounts-api-0.13.3.yaml" },
     ...
   ]
   ```

## Customization

### Styling

Brand colors and design tokens are in `src/assets/css/variables.css`:

```css
:root {
  --color-primary: #00DF99;       /* PortX mint green */
  --color-primary-light: #89FFF8;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'IBM Plex Sans', sans-serif;
}
```

### Dark Mode

Dark mode is automatic based on system preference (`prefers-color-scheme`). Colors are defined in `variables.css`.

## Deployment

The `_site/` folder contains pure static HTML, CSS, and JS — no server required.

### GitHub Pages

1. Build the site:
   ```bash
   npm run build
   ```

2. Deploy `_site/` contents to your `gh-pages` branch, or configure GitHub Actions:

   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             
         - name: Install and Build
           run: |
             npm ci
             npm run build
             
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./_site
   ```

### Amazon S3

```bash
npm run build
aws s3 sync _site/ s3://your-bucket-name --delete
```

For CloudFront, add cache invalidation:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `_site`

Or use the Netlify CLI:
```bash
npm run build
npx netlify deploy --prod --dir=_site
```

### Vercel

```bash
npm run build
npx vercel --prod
```

Or connect your repository with:
- Build Command: `npm run build`
- Output Directory: `_site`

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with hot reload |
| `npm run build` | Build static site to `_site/` |
| `npm run clean` | Remove `_site/` directory |

## Tech Stack

- **[Eleventy](https://www.11ty.dev/)** — Static site generator
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** — Templating engine
- **[Stoplight Elements](https://github.com/stoplightio/elements)** — OpenAPI documentation UI
- **[Google Fonts](https://fonts.google.com/)** — Space Grotesk & IBM Plex Sans

## License

© 2026 PortX. All rights reserved.
