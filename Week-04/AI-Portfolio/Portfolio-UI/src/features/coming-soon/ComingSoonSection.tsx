import { motion } from 'framer-motion';
import {
  BrainCircuit,
  FlaskConical,
  Gauge,
  GraduationCap,
  NotebookPen,
  ScanText,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { type ComingSoonSection as ComingSoonSectionData } from '@/data/coming-soon';

const ICONS: Record<string, LucideIcon> = {
  FlaskConical,
  ScanText,
  BrainCircuit,
  GraduationCap,
  Gauge,
  Server,
  Wrench,
  NotebookPen,
};

type Props = {
  section: ComingSoonSectionData;
};

/** Premium "Coming soon" placeholder for a future deep-dive section. */
export function ComingSoonSection({ section }: Props) {
  const SectionIcon = ICONS[section.icon] ?? Sparkles;

  return (
    <Section id={section.id}>
      <SectionHeader
        eyebrow={section.eyebrow}
        title={section.title}
        description={section.description}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {section.items.map((item) => {
          const Icon = ICONS[item.icon] ?? Sparkles;
          return (
            <motion.div key={item.title} variants={staggerItem} className="h-full">
              <Card spotlight hover className="group flex h-full flex-col p-7">
                <div className="mb-6 flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-gradient-to-br from-white/[0.06] to-transparent text-accent-blue transition-all duration-300 group-hover:scale-110 group-hover:text-accent-cyan">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-accent-cyan" />
                    Coming soon
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-12 flex justify-center">
        <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/50">
          <SectionIcon className="h-3.5 w-3.5 text-accent-blue/80" strokeWidth={1.5} />
          In progress — this space is being built with the same rigor as the code.
        </div>
      </div>
    </Section>
  );
}
