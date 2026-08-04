import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { useRef } from 'react';
import { AuroraBackground, AnimatedGrid, ParticleField, NoiseTexture } from '@/components/Backgrounds';
import { MagneticButton } from '@/components/MagneticButton';
import { PROFILE, DASHBOARD, SOCIALS } from '@/lib/data';

const DASH_ICONS: Record<string, LucideIcon> = {
  Briefcase,
  GraduationCap,
  Rocket,
  BrainCircuit,
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.2);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${smx} ${smy}, rgba(91,140,255,0.10), transparent 70%)`;

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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-ink-950" />
      <AuroraBackground />
      <AnimatedGrid />
      <ParticleField count={24} />
      <motion.div aria-hidden style={{ background: spotlight }} className="pointer-events-none absolute inset-0 -z-10" />
      <NoiseTexture />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Status pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/75">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {PROFILE.availability}
          </span>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/55">
            <Briefcase className="h-3.5 w-3.5 text-accent-blue" />
            {PROFILE.status}
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tightest sm:text-6xl md:text-[4.5rem]">
          <HeroWord text="Building" delay={0.2} />{' '}
          <HeroWord text="production-ready" delay={0.28} />{' '}
          <HeroWord text="AI systems" delay={0.36} className="text-aurora" />{' '}
          <HeroWord text="that solve" delay={0.44} />{' '}
          <HeroWord text="real business" delay={0.52} />{' '}
          <HeroWord text="problems." delay={0.6} />
        </h1>

        {/* Value proposition */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg"
        >
          I’m <span className="text-white/85">{PROFILE.name}</span> — an AI Engineer specializing in Machine
          Learning, LLM applications, AI Agents, and intelligent backend infrastructure. Turning research into
          reliable systems that ship.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            href="/Resume_2026.pdf"
            ariaLabel="Download resume"
            className="group rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-950 shadow-[0_4px_24px_rgba(255,255,255,0.12)] transition-shadow hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)]"
          >
            <FileText className="h-4 w-4" />
            Resume
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="group rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet px-5 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(91,140,255,0.3)]"
          >
            Explore Projects
            <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </MagneticButton>
          <div className="flex items-center gap-2">
            <IconLink href={SOCIALS.github} icon={Github} label="GitHub" />
            <IconLink href={SOCIALS.linkedin} icon={Linkedin} label="LinkedIn" />
            <IconLink href={SOCIALS.email} icon={Mail} label="Email" />
          </div>
        </motion.div>

        {/* Engineering dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 w-full"
        >
          <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline sm:grid-cols-4">
            {DASHBOARD.map((d, i) => {
              const Icon = DASH_ICONS[d.icon] ?? BrainCircuit;
              return (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.15 + i * 0.08, duration: 0.5 }}
                  className="group relative bg-white/[0.012] p-4 text-left transition-colors duration-300 hover:bg-white/[0.03] sm:p-5"
                >
                  <Icon className="mb-3 h-4 w-4 text-accent-blue/70 transition-colors group-hover:text-accent-cyan" strokeWidth={1.5} />
                  <div className="text-lg font-semibold tracking-tight text-white sm:text-xl">{d.value}</div>
                  <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">{d.label}</div>
                  <div className="mt-0.5 text-xs text-white/50">{d.sub}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35 transition-colors hover:text-white/65"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-white/50"
          />
        </span>
      </motion.a>
    </section>
  );
}

function HeroWord({ text, delay, className = '' }: { text: string; delay: number; className?: string }) {
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

function IconLink({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  return (
    <MagneticButton
      href={href}
      ariaLabel={label}
      className="grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-white/[0.03] text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </MagneticButton>
  );
}
