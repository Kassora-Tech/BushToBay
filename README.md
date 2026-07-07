# Bush to Bay Travel and Tours

Rebuild of [bushtobay.co.za](https://bushtobay.co.za) — luxury coach hire from Gauteng to anywhere in Southern Africa.

Built by **Kassora Tech**.

## Stack

- **Next.js 14** (App Router, TypeScript) — deployed on Vercel
- **Tailwind CSS** + tailwindcss-animate — light mode default, full dark mode
- **Framer Motion** — reveals, parallax, layout animations, scroll progress
- **GSAP + ScrollTrigger** — pinned horizontal fleet showcase
- **Lenis** — smooth inertia scrolling
- **React Three Fiber + drei + postprocessing** — 3D hero scene with bloom
- **WCAG** — skip link, focus-visible styles, aria labels, reduced-motion support, semantic landmarks

## Development

```bash
npm install
npm run dev
```

## Notes

- The contact form is demo-only for now; it will be wired to Supabase once the rebuild is approved.
- Fleet imagery is sourced from the client's existing site and AI-upscaled 4x
  (Real-ESRGAN) from the WhatsApp-compressed originals.
- Testimonials on the homepage are demo placeholders — replace with the
  client's real reviews before launch.
