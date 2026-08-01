import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText, Github, Linkedin, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import {
  AuroraBackground,
  AnimatedGrid,
  ParticleField,
  NoiseTexture,
} from '@/components/effects/Backgrounds';
import { Button } from '@/components/ui/Button';
import { siteConfig, SOCIALS } from '@/data/site';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.2);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${smx} ${smy}, rgba(91,140,255,0.10), transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-ink-950" />
      <AuroraBackground />
      <AnimatedGrid />
      <ParticleField count={26} />
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 -z-10"
      />
      <NoiseTexture />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {siteConfig.availability}
        </motion.div>

        {/* Headline */}
        <h1 className="text-balance text-4xl font-semibold leading-[1.04] tracking-tightest sm:text-6xl md:text-7xl">
          <HeroWord text="Building" delay={0.2} /> <HeroWord text="production-ready" delay={0.28} />{' '}
          <HeroWord text="AI systems" delay={0.36} className="text-aurora" />{' '}
          <HeroWord text="that solve" delay={0.44} /> <HeroWord text="real business" delay={0.52} />{' '}
          <HeroWord text="problems." delay={0.6} />
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="#contact" className="group">
            <Sparkles className="h-4 w-4" />
            Let’s talk
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
          <Button href={SOCIALS.github} variant="ghost" ariaLabel="GitHub profile">
            <Github className="h-4 w-4" />
            GitHub
          </Button>
          <Button href={SOCIALS.linkedin} variant="ghost" ariaLabel="LinkedIn profile">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
          <Button href={siteConfig.resumeUrl} variant="ghost" ariaLabel="Download resume">
            <FileText className="h-4 w-4" />
            Resume
          </Button>
        </motion.div>

        {/* Profile monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent-blue/40 via-accent-violet/30 to-accent-cyan/30 blur-xl" />
            <div className="glass-strong relative h-full w-full overflow-hidden rounded-full">
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-700 to-ink-900">
                <span className="font-serif text-4xl text-white/70">{siteConfig.initials}</span>
              </div>
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </div>
            <span className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-accent-cyan ring-1 ring-white/10">
              <Sparkles className="h-4 w-4" />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-white/70"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-white/60"
          />
        </span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </motion.a>
    </section>
  );
}

/** A single word that rises + unblurs into place. */
function HeroWord({
  text,
  delay,
  className = '',
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: '0.4em', filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
}
