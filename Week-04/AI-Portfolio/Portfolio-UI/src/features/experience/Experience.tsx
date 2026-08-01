import {
  BadgeCheck,
  BrainCircuit,
  GraduationCap,
  Rocket,
  Sparkles,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Stats } from '@/components/ui/Stats';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';
import { EXPERIENCE, STATS, type TimelineEntry } from '@/data/experience';

const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Sparkles,
  BrainCircuit,
  Rocket,
  Trophy,
  BadgeCheck,
};

const TYPE_LABEL: Record<TimelineEntry['type'], string> = {
  education: 'Education',
  internship: 'Internship',
  hackathon: 'Hackathon',
  certification: 'Certification',
  achievement: 'Achievement',
};

export function Experience() {
  const timelineItems: TimelineItem[] = EXPERIENCE.map((entry) => ({
    icon: ICONS[entry.icon] ?? Sparkles,
    typeLabel: TYPE_LABEL[entry.type],
    period: entry.period,
    title: entry.title,
    org: entry.org,
    description: entry.description,
  }));

  return (
    <Section
      id="experience"
      background={
        <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[40vh] w-[40vw] rounded-full bg-accent-blue/10 blur-[140px]" />
      }
    >
      <SectionHeader
        eyebrow="Experience"
        title="The path here"
        description="Education, internships, hackathons, certifications and achievements — the milestones that shaped how I build."
      />

      {/* Animated stats */}
      <Reveal className="mt-14">
        <Stats items={STATS} />
      </Reveal>

      {/* Vertical timeline */}
      <div className="mt-20">
        <Timeline items={timelineItems} />
      </div>
    </Section>
  );
}
