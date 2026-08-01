import { lazy, Suspense } from 'react';
import { CursorGlow } from '@/components/effects/CursorGlow';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { Navbar } from '@/features/layout/Navbar';
import { Hero } from '@/features/hero/Hero';

/* Below-the-fold sections are code-split so the hero paints fast. */
const About = lazy(() => import('@/features/about/About').then((m) => ({ default: m.About })));
const Projects = lazy(() =>
  import('@/features/projects/Projects').then((m) => ({ default: m.Projects })),
);
const Skills = lazy(() => import('@/features/skills/Skills').then((m) => ({ default: m.Skills })));
const Experience = lazy(() =>
  import('@/features/experience/Experience').then((m) => ({ default: m.Experience })),
);
const CaseStudies = lazy(() =>
  import('@/features/coming-soon/CaseStudies').then((m) => ({ default: m.CaseStudies })),
);
const Blog = lazy(() => import('@/features/coming-soon/Blog').then((m) => ({ default: m.Blog })));
const Contact = lazy(() =>
  import('@/features/contact/Contact').then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() => import('@/features/layout/Footer').then((m) => ({ default: m.Footer })));

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-white/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Projects />
          <Skills />
          <Experience />
          <CaseStudies />
          <Blog />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
