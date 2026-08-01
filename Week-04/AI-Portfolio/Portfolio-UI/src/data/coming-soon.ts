export type ComingSoonSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Lucide icon name resolved by the feature. */
  icon: string;
  items: ComingSoonItem[];
};

export type ComingSoonItem = {
  title: string;
  description: string;
  /** Lucide icon name resolved by the feature. */
  icon: string;
};

export const CASE_STUDIES: ComingSoonSection = {
  id: 'case-studies',
  eyebrow: 'Case Studies',
  title: 'Deep dives, coming soon',
  description:
    'Full breakdowns of the systems I’ve shipped — the problem, the architecture, the trade-offs, and the metrics that mattered.',
  icon: 'FlaskConical',
  items: [
    {
      title: 'ExtractIQ Engine',
      description:
        'End-to-end walkthrough of a multi-agent document intelligence pipeline, from OCR to validated JSON.',
      icon: 'ScanText',
    },
    {
      title: 'EchoOps AI',
      description:
        'How conversational memory was designed with vector stores, graph links, and time-decayed relevance.',
      icon: 'BrainCircuit',
    },
    {
      title: 'SmartPrep AI',
      description:
        'Building an adaptive LLM judge with rubric grading and a measurable readiness score.',
      icon: 'GraduationCap',
    },
  ],
};

export const BLOG: ComingSoonSection = {
  id: 'blog',
  eyebrow: 'Blog',
  title: 'Notes from the build',
  description:
    'Writing in progress — lessons on LLM systems, ML engineering, and what it actually takes to ship AI that earns its place in production.',
  icon: 'NotebookPen',
  items: [
    {
      title: 'LLMs & Evaluation',
      description:
        'Why evals are the real product, and how I structure them for agentic workflows.',
      icon: 'Gauge',
    },
    {
      title: 'Production ML',
      description:
        'From notebook to deployment — the gap between a working model and a working system.',
      icon: 'Server',
    },
    {
      title: 'AI Engineering Practice',
      description:
        'Observability, guardrails, and the habits that separate prototypes from products.',
      icon: 'Wrench',
    },
  ],
};
