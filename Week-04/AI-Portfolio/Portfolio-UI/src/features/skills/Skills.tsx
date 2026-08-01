import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Server,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { SKILL_CATEGORIES } from '@/data/skills';

const ICONS: Record<string, LucideIcon> = {
  Code2,
  BrainCircuit,
  Server,
  Cloud,
  Database,
  Wrench,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        eyebrow="Skills"
        title="The toolkit"
        description="A focused stack spanning the full lifecycle — from model experimentation to resilient production deployment."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = ICONS[cat.icon] ?? Code2;
          return <SkillCard key={cat.title} title={cat.title} icon={Icon} skills={cat.skills} />;
        })}
      </motion.div>
    </Section>
  );
}

function SkillCard({
  title,
  icon: Icon,
  skills,
}: {
  title: string;
  icon: LucideIcon;
  skills: string[];
}) {
  return (
    <motion.div variants={staggerItem}>
      <Card spotlight hover className="group h-full p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-gradient-to-br from-white/[0.06] to-transparent text-accent-blue transition-all duration-300 group-hover:scale-110 group-hover:text-accent-cyan">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <Badge key={s} variant="skill">
              {s}
            </Badge>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
