# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Publicpage deploy notes

- This app is deployed from its own repository: `https://github.com/evolvian-ai-official/evolvian-publicpage`
- Render should point to branch `main`
- Root Directory should stay empty
- Build command: `npm run build`
- Publish directory: `dist`

## Analytics notes

- GA4 Measurement ID: `G-44VLLPV4F5`
- Google tag is loaded in production with consent defaulting to `denied`, so the site is detectable by GA/Tag Assistant before analytics consent is granted
- When a visitor grants analytics consent on the current page, the app replays the current `page_view` so the landing page is not lost
- Do not send PII to GA4 or Meta events. Email, phone, and names must stay out of `trackEvent` payloads
- `trackEvent(... value)` must remain numeric-only. Use labels or categories for non-sensitive descriptors
