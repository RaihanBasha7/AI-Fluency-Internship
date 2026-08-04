import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  BadgeCheck,
  BrainCircuit,
  Briefcase,
  Github,
  GraduationCap,
  Rocket,
  Sparkles,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal } from '@/components/Reveal';
import { EXPERIENCE, STATS, type TimelineEntry } from '@/lib/data';

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  GraduationCap,
  Rocket,
  Trophy,
  Github,
  BadgeCheck,
  BrainCircuit,
  Sparkles,
};

const TYPE_LABEL: Record<TimelineEntry['type'], string> = {
  education: 'Education',
  internship: 'Internship',
  hackathon: 'Hackathon',
  opensource: 'Open Source',
  achievement: 'Achievement',
};

const TYPE_COLOR: Record<TimelineEntry['type'], string> = {
  internship: 'text-accent-cyan/90 border-accent-cyan/20 bg-accent-cyan/10',
  education: 'text-accent-blue/90 border-accent-blue/20 bg-accent-blue/10',
  hackathon: 'text-amber-300/90 border-amber-400/20 bg-amber-400/10',
  opensource: 'text-violet-300/90 border-violet-400/20 bg-violet-400/10',
  achievement: 'text-emerald-300/90 border-emerald-400/20 bg-emerald-400/10',
};

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[40vh] w-[40vw] rounded-full bg-accent-blue/8 blur-[140px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Experience"
          title="The path here"
          description="Education, internships, hackathons, open source, and the engineering journey that shaped how I build."
        />

        <Reveal className="mt-14">
          <StatsGrid />
        </Reveal>

        <div className="mt-20">
          <VerticalTimeline />
        </div>
      </div>
    </section>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06}>
          <div className="glass group relative overflow-hidden rounded-2xl border border-hairline p-5 text-center transition-colors duration-300 hover:border-white/15">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/45">{s.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

function VerticalTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent-blue/40 via-white/10 to-transparent sm:left-1/2" />
      <ol className="space-y-8">
        {EXPERIENCE.map((entry, i) => (
          <TimelineRow key={entry.title} entry={entry} index={i} />
        ))}
      </ol>
    </div>
  );
}

function TimelineRow({ entry, index }: { entry: TimelineEntry; index: number }) {
  const Icon = ICONS[entry.icon] ?? Sparkles;
  const leftSide = index % 2 === 0;
  return (
    <motion.li
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12 sm:pl-0"
    >
      <div className="sm:grid sm:grid-cols-2 sm:gap-8">
        <span className="absolute left-4 top-5 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-ink-850 text-accent-blue shadow-[0_0_16px_rgba(91,140,255,0.2)] sm:left-1/2">
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>

        <div className={`sm:col-span-1 ${leftSide ? 'sm:pr-8 sm:text-right' : 'sm:col-start-2 sm:pl-8'}`}>
          <div className="glass group rounded-2xl border border-hairline p-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.04]">
            <div className={`mb-2 flex items-center gap-2 ${leftSide ? 'sm:justify-end' : ''}`}>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${TYPE_COLOR[entry.type]}`}>
                {TYPE_LABEL[entry.type]}
              </span>
              <span className="text-xs text-white/40">{entry.period}</span>
            </div>
            <h4 className="text-base font-semibold text-white">{entry.title}</h4>
            <div className="mt-0.5 text-sm text-accent-blue/80">{entry.org}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{entry.description}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
