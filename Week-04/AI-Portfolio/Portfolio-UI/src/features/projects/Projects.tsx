import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BrainCircuit,
  FileText,
  Github,
  GraduationCap,
  Layers,
  LineChart,
  ScanText,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PROJECTS, type Project } from '@/data/projects';

const ICONS: Record<string, LucideIcon> = {
  ScanText,
  BrainCircuit,
  GraduationCap,
};

export function Projects() {
  return (
    <Section
      id="projects"
      background={
        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[40vh] w-[60vw] -translate-x-1/2 rounded-full bg-accent-violet/10 blur-[140px]" />
      }
    >
      <SectionHeader
        eyebrow="Featured Projects"
        title="Systems I’ve shipped"
        description="Three production-grade AI systems — each born from a real problem, architected for scale, and measured by business impact."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICONS[project.icon] ?? Sparkles;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Card spotlight className="flex h-full flex-col overflow-hidden">
        {/* accent glow header */}
        <div className={`relative h-28 overflow-hidden bg-gradient-to-br ${project.accent}`}>
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-ink-900/60 backdrop-blur">
              <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
            </span>
          </div>
          <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-ink-900/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60 backdrop-blur">
            0{index + 1}
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
          <p className="mt-1 text-sm text-white/50">{project.tagline}</p>

          {/* detail rows */}
          <div className="mt-5 flex flex-1 flex-col gap-4">
            <Detail icon={Sparkles} label="Problem" text={project.problem} />
            <Detail icon={Layers} label="Solution" text={project.solution} />
            <Detail icon={BrainCircuit} label="Architecture" text={project.architecture} />
            <Detail
              icon={LineChart}
              label="Business Value"
              text={project.businessValue}
              highlight
            />
          </div>

          {/* tech stack */}
          <div className="mt-5">
            <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <Badge key={t} variant="chip">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* links */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-hairline pt-5">
            <ProjectLink href={project.github} icon={Github} label="Code" />
            <ProjectLink href={project.demo} icon={ArrowUpRight} label="Live Demo" />
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-white/55 transition-colors hover:text-white"
            >
              <FileText className="h-3.5 w-3.5" />
              {expanded ? 'Hide case study' : 'Case study'}
            </button>
          </div>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 rounded-2xl border border-hairline bg-white/[0.02] p-4 text-xs leading-relaxed text-white/55">
                <CaseRow label="Problem" text={project.problem} />
                <CaseRow label="Solution" text={project.solution} />
                <CaseRow label="Architecture" text={project.architecture} />
                <CaseRow label="Business Value" text={project.businessValue} />
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.article>
  );
}

function Detail({
  icon: Icon,
  label,
  text,
  highlight,
}: {
  icon: LucideIcon;
  label: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <Icon
        className={`mt-0.5 h-4 w-4 shrink-0 ${highlight ? 'text-accent-cyan' : 'text-white/40'}`}
        strokeWidth={1.5}
      />
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
          {label}
        </div>
        <p className="mt-0.5 text-sm leading-relaxed text-white/65">{text}</p>
      </div>
    </div>
  );
}

function ProjectLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:border-accent-blue/40 hover:bg-white/[0.07] hover:text-white"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      {label}
    </a>
  );
}

function CaseRow({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-accent-blue/70">
        {label}
      </div>
      <p className="mt-1">{text}</p>
    </div>
  );
}
