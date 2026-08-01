import { siteConfig } from '@/data/site';

/** Short personal introduction shown above the philosophy cards. */
export const ABOUT_INTRO = `I started as a curious computer science student tinkering with my first ML models, and that curiosity became a direction. Through continuous learning, internships, hackathons, and real-world AI projects, I've grown into an aspiring ${siteConfig.role} — someone who cares less about demos and more about systems that survive contact with production.`;

export const ABOUT_SUMMARY =
  'I build AI the way great teams build infrastructure — pragmatic, measurable, and built to last beyond the demo.';

export type Principle = {
  title: string;
  body: string;
  /** Lucide icon name resolved by the feature. */
  icon: string;
};

export const PRINCIPLES: Principle[] = [
  {
    icon: 'Cpu',
    title: 'Systems over demos',
    body: 'A model that doesn’t survive contact with production is a science experiment. I design for latency, failure, and observability from day one.',
  },
  {
    icon: 'Layers',
    title: 'Composition over reinvention',
    body: 'Smart pipelines are built from reliable, swappable components — retrieval, routing, evals — not monolithic prompts that no one can debug.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Trust is a feature',
    body: 'Guardrails, evals, and human-in-the-loop checkpoints are not afterthoughts. They are the product, especially in regulated domains.',
  },
  {
    icon: 'BrainCircuit',
    title: 'Business value first',
    body: 'Every architecture decision starts with the metric it moves. If a simpler approach wins on the KPI, the simpler approach ships.',
  },
];

export const ABOUT_TIMELINE = [
  {
    title: 'Computer Science Engineering',
    desc: 'Foundation in algorithms, systems, and intelligence.',
  },
  { title: 'AI Fluency Internship', desc: 'Production LLM patterns, evals, and guardrails.' },
  { title: 'Machine Learning Internship', desc: 'Deploying models that serve real traffic.' },
  { title: 'AI Projects', desc: 'Shipping end-to-end intelligent systems.' },
  { title: 'Hackathons', desc: 'Competing and winning under pressure.' },
] as const;
