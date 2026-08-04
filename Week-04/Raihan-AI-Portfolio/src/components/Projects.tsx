import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  BrainCircuit,
  Compass,
  FileText,
  GitBranch,
  Github,
  Layers,
  LineChart,
  ScanText,
  Scale,
  Sparkles,
  Target,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { useSpotlight } from '@/lib/hooks';
import { PROJECTS, type Project } from '@/lib/data';

const ICONS: Record<string, LucideIcon> = {
  ScanText,
  Compass,
  GitBranch,
};

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[40vh] w-[60vw] -translate-x-1/2 rounded-full bg-accent-violet/8 blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Systems I've shipped"
          description="Three production-grade AI systems — each born from a real business problem, architected for scale, and measured by impact."
        />
        <div className="mt-16 flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectShowcase key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const Icon = ICONS[project.icon] ?? Sparkles;
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="card-spotlight glass relative overflow-hidden rounded-3xl border border-hairline"
      >
        {/* Header band */}
        <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${project.accent}`}>
          <div className="absolute inset-0 bg-dots opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-ink-900/60 backdrop-blur">
                <Icon className="h-6 w-6 text-white" strokeWidth={1.4} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
                  {project.badge && (
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-300/90">
                      {project.badge}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-white/60">{project.tagline}</p>
              </div>
            </div>
            <span className="hidden rounded-full border border-white/15 bg-ink-900/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50 backdrop-blur sm:block">
              0{index + 1} / 03
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Key details grid */}
          <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
            <Detail icon={Target} label="Business Problem" text={project.problem} />
            <Detail icon={Sparkles} label="Solution" text={project.solution} />
            <Detail icon={Layers} label="Architecture" text={project.architecture} />
            <Detail icon={Workflow} label="AI Workflow" text={project.aiWorkflow} />
            <Detail icon={BrainCircuit} label="Engineering Challenges" text={project.challenges} />
            <Detail icon={Scale} label="Trade-offs" text={project.tradeoffs} />
          </div>

          {/* Results + Impact */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2 text-emerald-300/80">
                <LineChart className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-[10px] font-medium uppercase tracking-[0.16em]">Results</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{project.results}</p>
            </div>
            <div className="rounded-2xl border border-accent-blue/15 bg-accent-blue/[0.03] p-5">
              <div className="mb-2 flex items-center gap-2 text-accent-blue/80">
                <Target className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-[10px] font-medium uppercase tracking-[0.16em]">Business Impact</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{project.businessImpact}</p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="mt-6">
            <div className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">Tech Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-hairline bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-white/65 transition-colors duration-200 hover:border-accent-blue/40 hover:text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-hairline pt-6">
            <ProjectLink href={project.demo} icon={ArrowUpRight} label="Live Demo" primary />
            <ProjectLink href={project.github} icon={Github} label="GitHub" />
            <ProjectLink href={project.caseStudy} icon={FileText} label="Case Study" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-white/50 transition-colors hover:text-white"
            >
              {open ? 'Hide details' : 'View details'}
            </button>
          </div>

          {/* Expandable full breakdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid gap-4 rounded-2xl border border-hairline bg-white/[0.015] p-5 sm:grid-cols-2">
                  <CaseRow icon={Target} label="Problem" text={project.problem} />
                  <CaseRow icon={Sparkles} label="Solution" text={project.solution} />
                  <CaseRow icon={Layers} label="Architecture" text={project.architecture} />
                  <CaseRow icon={Workflow} label="AI Workflow" text={project.aiWorkflow} />
                  <CaseRow icon={BrainCircuit} label="Challenges" text={project.challenges} />
                  <CaseRow icon={Scale} label="Trade-offs" text={project.tradeoffs} />
                  <CaseRow icon={LineChart} label="Results" text={project.results} />
                  <CaseRow icon={Target} label="Business Impact" text={project.businessImpact} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

function Detail({
  icon: Icon,
  label,
  text,
}: {
  icon: LucideIcon;
  label: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/35" strokeWidth={1.5} />
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">{label}</div>
        <p className="mt-1 text-sm leading-relaxed text-white/65">{text}</p>
      </div>
    </div>
  );
}

function ProjectLink({
  href,
  icon: Icon,
  label,
  primary,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className={
        primary
          ? 'inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-950 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
          : 'inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:border-accent-blue/40 hover:bg-white/[0.07] hover:text-white'
      }
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      {label}
    </a>
  );
}

function CaseRow({ icon: Icon, label, text }: { icon: LucideIcon; label: string; text: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue/60" strokeWidth={1.5} />
      <div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</div>
        <p className="mt-1 text-xs leading-relaxed text-white/60">{text}</p>
      </div>
    </div>
  );
}
