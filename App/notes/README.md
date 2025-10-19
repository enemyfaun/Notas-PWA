# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## PWA

Este proyecto está configurado como PWA con `vite-plugin-pwa`.

- Registro del SW: `src/pwa.js` (se invoca desde `src/main.jsx`).
- Manifest se genera en `dist/manifest.webmanifest` durante el build.

Cómo probar:

1. Build de producción y preview local:

	- `npm run build`
	- `npm run preview`

2. Abre http://localhost:5173 y verifica en Application > Manifest/Service Workers en DevTools.

Notas:

- Para iconos de instalación, agrega PNGs maskable en `public/` (192x192, 512x512) y actualiza `vite.config.js`.
- El SW usa `generateSW` con Workbox y cachea HTML (NetworkFirst), JS/CSS (SWR) e imágenes (CacheFirst).
