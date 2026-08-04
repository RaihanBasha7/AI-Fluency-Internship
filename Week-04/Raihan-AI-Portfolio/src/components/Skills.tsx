import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { staggerContainer, staggerItem } from '@/components/Reveal';
import { useSpotlight } from '@/lib/hooks';
import { SKILL_CATEGORIES } from '@/lib/data';

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit,
  Cpu,
  Sparkles,
  Server,
  Cloud,
  Database,
  GitBranch,
  Code2,
  Wrench,
};

const LEVEL_COLOR: Record<string, string> = {
  Expert: 'text-emerald-300/90 bg-emerald-400/10 border-emerald-400/20',
  Production: 'text-accent-cyan/90 bg-accent-cyan/10 border-accent-cyan/20',
  Advanced: 'text-accent-blue/90 bg-accent-blue/10 border-accent-blue/20',
  Intermediate: 'text-white/60 bg-white/[0.05] border-white/10',
};

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Skills"
          title="Engineering capabilities"
          description="Not a list of buzzwords — a map of what I can build, ship, and operate in production."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.icon] ?? Code2;
            return <SkillCard key={cat.title} title={cat.title} icon={Icon} capabilities={cat.capabilities} />;
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({
  title,
  icon: Icon,
  capabilities,
}: {
  title: string;
  icon: LucideIcon;
  capabilities: { name: string; level: string }[];
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  return (
    <motion.div variants={staggerItem}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="card-spotlight glass group h-full rounded-3xl border border-hairline p-6 transition-colors duration-300 hover:border-white/15"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-gradient-to-br from-white/[0.06] to-transparent text-accent-blue transition-all duration-300 group-hover:scale-110 group-hover:text-accent-cyan">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <ul className="flex flex-col gap-2">
          {capabilities.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between gap-2 rounded-lg border border-hairline bg-white/[0.02] px-3 py-2 transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.04]"
            >
              <span className="text-sm text-white/75">{c.name}</span>
              <span
                className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium ${LEVEL_COLOR[c.level] ?? LEVEL_COLOR.Intermediate}`}
              >
                {c.level}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
