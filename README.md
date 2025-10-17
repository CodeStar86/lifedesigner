
  # Life Designer App

  This is a code bundle for Life Designer App. The original project is available at https://www.figma.com/design/UVbcHRioTH9EmvkeeBrw7K/Life-Designer-App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  

## GitHub Pages (lifedesigner)

This project is pre-configured for GitHub Pages with Vite.

- Vite `base` is set to `/lifedesigner/` in `vite.config.ts`.
- Build outputs to `dist/`.
- SPA fallback `404.html` included for client-side routing.
- Workflow `.github/workflows/pages.yml` builds and deploys on push to `main`.

### Commands
```bash
npm i
npm run dev   # http://localhost:3000
npm run build # outputs to dist/
```

### One-time GitHub settings
- In **Settings ▸ Pages**, set **Source** to **GitHub Actions**.
