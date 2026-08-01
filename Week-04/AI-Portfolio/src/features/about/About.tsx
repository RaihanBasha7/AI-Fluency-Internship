import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Layers, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { useSpotlight } from '@/lib/hooks';
import { ABOUT_INTRO, ABOUT_SUMMARY, ABOUT_TIMELINE, PRINCIPLES } from '@/data/about';

const ICONS: Record<string, LucideIcon> = {
  Cpu,
  Layers,
  ShieldCheck,
  BrainCircuit,
};

export function About() {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <Section id="about">
      <SectionHeader eyebrow="About" title="Engineering philosophy" description={ABOUT_SUMMARY} />

      {/* Journey introduction */}
      <Reveal className="mt-12 max-w-3xl">
        <p className="text-pretty text-lg leading-relaxed text-white/60">{ABOUT_INTRO}</p>
      </Reveal>

      {/* Philosophy cards */}
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="card-spotlight glass mt-14 grid gap-px overflow-hidden rounded-3xl border border-hairline sm:grid-cols-2"
      >
        {PRINCIPLES.map((p, i) => {
          const Icon = ICONS[p.icon] ?? Cpu;
          return (
            <motion.div
              key={p.title}
              variants={staggerItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08 }}
              className="group relative z-10 bg-white/[0.015] p-7 transition-colors duration-300 hover:bg-white/[0.04] sm:p-9"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-gradient-to-br from-white/[0.06] to-transparent text-accent-blue transition-all duration-300 group-hover:scale-110 group-hover:text-accent-cyan">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{p.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{p.body}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Journey timeline */}
      <Reveal delay={0.1} className="mt-20">
        <h3 className="mb-8 text-sm font-medium uppercase tracking-[0.18em] text-white/40">
          The journey so far
        </h3>
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {ABOUT_TIMELINE.map((step, i) => (
            <motion.li
              key={step.title}
              variants={staggerItem}
              className="group relative rounded-2xl border border-hairline bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.04]"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-xs text-accent-blue/80">0{i + 1}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
              </div>
              <h4 className="mb-1.5 text-sm font-semibold text-white">{step.title}</h4>
              <p className="text-xs leading-relaxed text-white/50">{step.desc}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Reveal>
    </Section>
  );
}
