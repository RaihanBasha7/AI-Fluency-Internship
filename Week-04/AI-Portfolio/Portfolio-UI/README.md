# Raihan Basha — AI Engineer Portfolio

A production-quality, single-page AI Engineer portfolio built with **React 18**, **TypeScript** (strict), **Tailwind CSS**, and **Framer Motion**. The UI is treated as design-approved and engineering work focuses on structure, content, accessibility, performance, and maintainability.

## ✨ Highlights

- **Single-page experience** with hero, about, projects, skills, experience, case studies (coming soon), blog (coming soon), and contact
- **Preserved visual identity** — glassmorphism, gradients, animations, and motion timing untouched
- **Feature-based architecture** — `src/features/*` with colocated components and centralized data in `src/data/*`
- **Reusable UI primitives** — `Button`, `Section`, `Card`, `Badge`, `Timeline`, `Stats`, `Reveal`, `SectionHeader`
- **Accessible** — skip-to-content link, reduced-motion support, semantic landmarks, focus-visible styles, keyboard-friendly menu
- **Fast** — code-split sections (`React.lazy`), vendor chunking, minimal initial JS
- **SEO-ready** — Open Graph, Twitter cards, JSON-LD `Person` schema, `robots.txt`, `sitemap.xml`

## Tech Stack

| Layer     | Choice                                               |
| --------- | ---------------------------------------------------- |
| Framework | React 18 + TypeScript (strict)                       |
| Build     | Vite 5                                               |
| Styling   | Tailwind CSS 3                                       |
| Motion    | Framer Motion 12                                     |
| Icons     | lucide-react                                         |
| Quality   | ESLint (react + a11y), Prettier, Husky + lint-staged |

## Getting Started

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check + production build
npm run preview    # preview the production build locally
```

### Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start the Vite dev server            |
| `npm run build`        | Type-check then build for production |
| `npm run preview`      | Preview the production build         |
| `npm run typecheck`    | Run `tsc --noEmit`                   |
| `npm run lint`         | Lint with ESLint                     |
| `npm run lint:fix`     | Lint and auto-fix                    |
| `npm run format`       | Format all files with Prettier       |
| `npm run format:check` | Verify formatting                    |

A `pre-commit` hook runs **lint-staged** (ESLint + Prettier) on staged files.

## Project Structure

```
src/
├── app/                      # App shell + lazy section mounting
├── components/
│   ├── ui/                   # Reusable primitives
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── Reveal.tsx
│   │   ├── Section.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── Stats.tsx
│   │   └── Timeline.tsx
│   └── effects/              # Backgrounds, scroll progress, cursor glow
├── data/                     # Centralized content (single source of truth)
│   ├── about.ts
│   ├── coming-soon.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── site.ts               # Name, links, SEO config
│   └── skills.ts
├── features/
│   ├── about/
│   ├── coming-soon/          # Case Studies + Blog placeholders
│   ├── contact/
│   ├── experience/
│   ├── hero/
│   ├── layout/               # Navbar, Footer
│   ├── projects/
│   └── skills/
└── lib/                      # Hooks + shared motion variants + utils
```

## Customization

All content lives in `src/data/` — edit those files to update the portfolio without touching components:

- **`src/data/site.ts`** — name, role, headline, availability, social links, email, resume link, and site URL.
- **`src/data/projects.ts`** — featured projects.
- **`src/data/skills.ts`** — skill categories.
- **`src/data/experience.ts`** — education, internships, and timeline milestones.
- **`src/data/about.ts`** — philosophy cards and journey timeline.
- **`src/data/coming-soon.ts`** — Case Studies and Blog placeholder content.

### Before deploying, update

1. **Real links** in `src/data/site.ts` (GitHub, LinkedIn, email, resume URL).
2. **Domain** — replace every `https://raihanbasha.dev` reference (canonical, OG tags, JSON-LD, `robots.txt`, `sitemap.xml`, `og-image.svg`).
3. **OG image** — replace `public/og-image.svg` with a real `1200×630` PNG (or JPG) for best social-share rendering.

## SEO & Social

- `index.html` ships title, description, Open Graph, and Twitter card metadata plus a JSON-LD `Person` schema.
- `public/robots.txt` and `public/sitemap.xml` are served as static assets.

## Deployment

Any static host works — the app is a pure SPA.

### Vercel

```bash
npm i -g vercel
vercel
```

Settings: Framework **Vite**, build command `npm run build`, output directory `dist`.

### Netlify

Build command: `npm run build` · Publish directory: `dist`

### GitHub Pages

Set `base` in `vite.config.ts` to the repo name, then build and deploy `dist`.

## Accessibility

- `prefers-reduced-motion` respected via `MotionConfig reducedMotion="user"`
- Skip-to-content link
- Semantic landmarks (`header`, `main`, `footer`, `nav`)
- Keyboard-closable mobile menu (Escape + dedicated dismiss backdrop)
- Visible focus indicators
- Labeled form controls with `autocomplete` hints

## License

Private project. All rights reserved.
