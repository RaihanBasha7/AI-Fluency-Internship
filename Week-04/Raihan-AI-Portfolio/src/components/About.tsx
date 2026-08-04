import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Cpu,
  Layers,
  Lightbulb,
  Search,
  ShieldCheck,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal, staggerContainer, staggerItem } from '@/components/Reveal';
import { useSpotlight } from '@/lib/hooks';
import { ABOUT_PRINCIPLES, ABOUT_JOURNEY, PROFILE } from '@/lib/data';

const ICONS: Record<string, LucideIcon> = {
  Cpu,
  Layers,
  ShieldCheck,
  BrainCircuit,
};

const STORY = [
  {
    icon: Search,
    title: 'How I solve problems',
    body: 'I start from the business metric, not the model. Before touching a neural network I ask: what decision does this system automate or inform, and what does failure cost? That framing keeps the architecture honest and the scope tight.',
  },
  {
    icon: Lightbulb,
    title: 'Why I build AI',
    body: 'AI is the first tool that lets a small team move with the leverage of a large one. I build AI systems because they compress the distance between an idea and its impact — and because doing it reliably is a genuinely hard, rewarding engineering problem.',
  },
  {
    icon: Cpu,
    title: 'How I think as an engineer',
    body: 'Composition over reinvention. Observability over cleverness. I treat prompts, retrievers, and evals as software —versioned, tested, and measured. A system I can’t debug is a system I can’t ship.',
  },
  {
    icon: Target,
    title: 'What I’m looking for',
    body: 'A team building AI products that touch real users — where production quality, evals, and backend rigor matter. I want to own systems end-to-end and learn from engineers who have shipped at scale.',
  },
];

export function About() {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <section id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="About"
          title="Engineering, not just models"
          description="I build AI the way great teams build infrastructure — pragmatic, measurable, and built to last beyond the demo."
        />

        {/* Engineering story */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {STORY.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="glass group h-full rounded-3xl border border-hairline p-7 transition-colors duration-300 hover:border-white/15">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-gradient-to-br from-white/[0.06] to-transparent text-accent-blue transition-all duration-300 group-hover:scale-110 group-hover:text-accent-cyan">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Principles */}
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          className="card-spotlight glass mt-8 grid gap-px overflow-hidden rounded-3xl border border-hairline sm:grid-cols-2 lg:grid-cols-4"
        >
          {ABOUT_PRINCIPLES.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Cpu;
            return (
              <motion.div
                key={p.title}
                variants={staggerItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06 }}
                className="group relative z-10 bg-white/[0.012] p-6 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <Icon className="mb-3 h-5 w-5 text-accent-blue/70 transition-colors group-hover:text-accent-cyan" strokeWidth={1.5} />
                <h4 className="mb-1.5 text-sm font-semibold text-white">{p.title}</h4>
                <p className="text-xs leading-relaxed text-white/50">{p.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Journey timeline */}
        <Reveal delay={0.1} className="mt-16">
          <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/40">The journey so far</h3>
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ABOUT_JOURNEY.map((step, i) => (
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
      </div>
    </section>
  );
}
