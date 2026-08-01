export type TimelineEntry = {
  type: 'education' | 'internship' | 'hackathon' | 'certification' | 'achievement';
  title: string;
  org: string;
  period: string;
  description: string;
  /** Lucide icon name resolved by the feature. */
  icon: string;
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    type: 'education',
    title: 'B.Tech, Computer Science Engineering',
    org: 'B.E.S.T. Innovation University',
    period: '2022 — 2026',
    description:
      'Final-year student specializing in intelligent systems. Coursework in algorithms, data structures, machine learning, and software engineering.',
    icon: 'GraduationCap',
  },
  {
    type: 'internship',
    title: 'AI Fluency Internship',
    org: 'FlyRank AI',
    period: '2025',
    description:
      'Studied production LLM patterns — evals, guardrails, retrieval architectures — and shipped an internal RAG prototype adopted by two teams.',
    icon: 'Sparkles',
  },
  {
    type: 'internship',
    title: 'Machine Learning Intern',
    org: 'FlyRank AI',
    period: '2025',
    description:
      'Built and deployed a classification model serving real traffic, reducing manual triage load and learning what it takes to ship ML to production.',
    icon: 'BrainCircuit',
  },
  {
    type: 'achievement',
    title: 'AI Projects',
    org: 'Open Source',
    period: '2023 — Present',
    description:
      'Shipped production-grade AI systems spanning document intelligence, conversational memory, and adaptive learning.',
    icon: 'Rocket',
  },
  {
    type: 'hackathon',
    title: 'Hackathon Finalist',
    org: 'National AI Hackathon',
    period: '2024',
    description:
      'Top 5 of 300+ teams for an agentic workflow that automates compliance review of vendor contracts.',
    icon: 'Trophy',
  },
  {
    type: 'certification',
    title: 'Deep Learning Specialization',
    org: 'Coursera',
    period: '2023',
    description:
      'Completed the full specialization covering neural networks, sequence models, and structuring ML projects.',
    icon: 'BadgeCheck',
  },
];

export const STATS = [
  { label: 'Projects Built', value: 12, suffix: '+' },
  { label: 'Hackathons', value: 6, suffix: '' },
  { label: 'Internships', value: 3, suffix: '' },
  { label: 'Certificates', value: 8, suffix: '' },
  { label: 'GitHub Contributions', value: 1400, suffix: '+' },
] as const;
