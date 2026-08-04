export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIALS = {
  github: 'https://github.com/RaihanBasha7',
  linkedin: 'https://www.linkedin.com/in/shaikraihanbasha',
  email: 'mailto:raihanshaik676@gmail.com',
};

export const PROFILE = {
  name: 'Shaik Raihan Basha',
  initials: 'SRB',
  role: 'Machine Learning Intern @ FlyRank AI',
  headline: 'Building production-ready AI systems that solve real business problems.',
  valueProp:
    'AI Engineer specializing in Machine Learning, LLM applications, AI Agents, and intelligent backend infrastructure — turning research into reliable systems that ship.',
  availability: 'Open to AI Engineering Opportunities',
  status: 'Machine Learning Intern @ FlyRank AI',
  graduation: '2027',
  degree: 'B.Tech Computer Science Engineering',
  goal: 'AI Engineer building scalable Machine Learning systems, LLM applications, AI Agents, and intelligent backend infrastructure.',
};

/** Real engineering metrics shown as a dashboard in the hero. */
export const DASHBOARD = [
  { label: 'Current Role', value: 'ML Intern', sub: 'FlyRank AI', icon: 'Briefcase' },
  { label: 'Graduating', value: '2027', sub: 'B.Tech CSE', icon: 'GraduationCap' },
  { label: 'Projects Shipped', value: '3', sub: 'Production AI', icon: 'Rocket' },
  { label: 'Focus', value: 'LLMs · Agents', sub: 'MLOps · Backend', icon: 'BrainCircuit' },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  problem: string;
  solution: string;
  architecture: string;
  aiWorkflow: string;
  techStack: string[];
  challenges: string;
  tradeoffs: string;
  results: string;
  businessImpact: string;
  github: string;
  demo: string;
  caseStudy: string;
  accent: string;
  icon: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'extractiq',
    name: 'ExtractIQ Engine',
    tagline: 'Production AI document intelligence platform.',
    badge: 'Flagship',
    problem:
      'Enterprises spend thousands of analyst-hours manually extracting structured data from contracts, invoices, and research reports — slow, error-prone, and impossible to audit at scale.',
    solution:
      'A multi-agent LLM pipeline that ingests heterogeneous documents, classifies them, and emits validated JSON aligned to a per-client schema — with a repair loop that auto-corrects low-confidence fields before they ever reach a human reviewer.',
    architecture:
      'Async ingestion queue → OCR + layout parser → router agent → specialized extractor agents → schema validator → repair loop → review queue. Cached embeddings for semantic deduplication and incremental re-processing.',
    aiWorkflow:
      'Router agent classifies document type and dispatches to domain-specific extractors. Each extractor returns structured JSON constrained by Pydantic schemas. A validator agent catches schema violations and feeds errors back to the extractor with repair instructions — closing the loop until output passes validation.',
    techStack: ['Python', 'FastAPI', 'LangGraph', 'GPT-4o', 'Pydantic', 'Postgres', 'Redis', 'Unstructured.io'],
    challenges:
      'Handling 40+ document layouts without per-template rules, keeping LLM costs predictable at scale, and ensuring structured outputs never drift from the target schema under adversarial inputs.',
    tradeoffs:
      'Chose a multi-agent graph over a single mega-prompt for debuggability and per-step evals — accepting higher latency in exchange for reliability and observability.',
    results:
      'Cut document processing time by 83% in a pilot. Extraction errors reduced to under 2%. The repair loop resolved 68% of validation failures autonomously, keeping human review volume minimal.',
    businessImpact:
      'Unlocked a previously unprofitable compliance workflow. The pilot client estimated six-figure annual savings from reduced analyst hours alone, with the added benefit of a full audit trail.',
    github: 'https://github.com/',
    demo: '#',
    caseStudy: '#',
    accent: 'from-blue-500/30 via-indigo-500/20 to-transparent',
    icon: 'ScanText',
  },
  {
    id: 'careerbridge',
    name: 'CareerBridge AI',
    tagline: 'AI-powered career platform.',
    problem:
      'Students and early-career engineers get generic career advice that ignores their actual skill gaps, target roles, and the specific signals recruiters evaluate — leaving them underprepared and invisible.',
    solution:
      'An AI platform that analyzes a candidate’s resume, detects skill gaps against target roles, generates a personalized learning roadmap, and prepares them for internships with adaptive mock interviews.',
    architecture:
      'Resume parser → skill graph builder → gap analysis engine (LLM + role taxonomy) → roadmap generator → adaptive interview coach. All backed by a profile store that evolves with each interaction.',
    aiWorkflow:
      'Resume analysis extracts structured skills and maps them to a role taxonomy. Gap detection compares the candidate profile against target-role requirements. The roadmap generator prioritizes learning paths by impact and effort. The interview coach uses a rubric-based LLM judge to score responses and feed weaknesses back into the roadmap.',
    techStack: ['Python', 'FastAPI', 'React', 'OpenAI', 'Postgres', 'Supabase', 'Tailwind'],
    challenges:
      'Building a role taxonomy that stays current, avoiding hallucinated skill gaps, and making the interview coach feel adaptive rather than scripted.',
    tradeoffs:
      'Used a structured role taxonomy over free-form LLM comparison for consistency and auditability — trading flexibility for reliability.',
    results:
      'Helped early users identify concrete skill gaps within minutes. The adaptive roadmap reduced time-to-preparedness by surfacing the highest-impact learning paths first.',
    businessImpact:
      'A scalable career-readiness platform that can serve thousands of students at low marginal cost — positioning it well for university and bootcamp partnerships.',
    github: 'https://github.com/',
    demo: '#',
    caseStudy: '#',
    accent: 'from-cyan-400/30 via-sky-500/20 to-transparent',
    icon: 'Compass',
  },
  {
    id: 'gitsense',
    name: 'GitSense',
    tagline: 'AI-powered GitHub repository analyzer.',
    problem:
      'Recruiters and engineering managers cannot assess a candidate’s code quality from a GitHub profile at a glance — stars and commit counts reveal nothing about architecture, maintainability, or engineering maturity.',
    solution:
      'An AI analyzer that ingests any public repository, evaluates code quality, surfaces architectural insights, and produces recruiter-ready analytics that translate engineering signals into hiring signals.',
    architecture:
      'Repo fetcher (GitHub API) → code graph builder → static analysis layer → LLM insight engine → analytics dashboard. Results cached per repo + commit SHA for incremental updates.',
    aiWorkflow:
      'Static analysis extracts complexity, duplication, and dependency metrics. The LLM insight engine synthesizes these into plain-language assessments of architecture quality, code health, and engineering practices — calibrated against industry benchmarks.',
    techStack: ['Python', 'FastAPI', 'GitHub API', 'OpenAI', 'Postgres', 'Redis', 'React'],
    challenges:
      'Normalizing metrics across languages and repo sizes, avoiding penalizing early-stage projects, and making LLM assessments consistent across different codebases.',
    tradeoffs:
      'Combined static analysis with LLM synthesis rather than pure LLM evaluation — grounding insights in measurable signals so assessments are reproducible and defensible.',
    results:
      'Produces consistent, recruiter-readable repo assessments in under a minute. Cached results make re-analysis near-instant for iterative commits.',
    businessImpact:
      'Bridges the gap between engineering work and hiring decisions — giving recruiters a defensible, data-backed view of a candidate’s actual code quality.',
    github: 'https://github.com/',
    demo: '#',
    caseStudy: '#',
    accent: 'from-violet-500/30 via-fuchsia-500/20 to-transparent',
    icon: 'GitBranch',
  },
];

export type SkillCategory = {
  title: string;
  icon: string;
  capabilities: { name: string; level: string }[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Artificial Intelligence',
    icon: 'BrainCircuit',
    capabilities: [
      { name: 'LLM Applications', level: 'Production' },
      { name: 'AI Agents', level: 'Production' },
      { name: 'RAG Systems', level: 'Production' },
      { name: 'Prompt Engineering', level: 'Advanced' },
      { name: 'Evals & Guardrails', level: 'Advanced' },
    ],
  },
  {
    title: 'Machine Learning',
    icon: 'Cpu',
    capabilities: [
      { name: 'PyTorch', level: 'Advanced' },
      { name: 'Model Fine-tuning', level: 'Intermediate' },
      { name: 'Embeddings & Vector Search', level: 'Advanced' },
      { name: 'Model Deployment', level: 'Advanced' },
    ],
  },
  {
    title: 'LLMs',
    icon: 'Sparkles',
    capabilities: [
      { name: 'OpenAI API', level: 'Production' },
      { name: 'LangChain', level: 'Advanced' },
      { name: 'LangGraph', level: 'Advanced' },
      { name: 'Structured Outputs', level: 'Production' },
    ],
  },
  {
    title: 'Backend Engineering',
    icon: 'Server',
    capabilities: [
      { name: 'FastAPI', level: 'Production' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'REST APIs', level: 'Production' },
      { name: 'Async Task Queues', level: 'Advanced' },
    ],
  },
  {
    title: 'Cloud',
    icon: 'Cloud',
    capabilities: [
      { name: 'AWS', level: 'Intermediate' },
      { name: 'Docker', level: 'Advanced' },
      { name: 'CI/CD', level: 'Advanced' },
      { name: 'Serverless', level: 'Intermediate' },
    ],
  },
  {
    title: 'Databases',
    icon: 'Database',
    capabilities: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'pgvector', level: 'Advanced' },
      { name: 'Redis', level: 'Advanced' },
      { name: 'Supabase', level: 'Advanced' },
    ],
  },
  {
    title: 'DevOps',
    icon: 'GitBranch',
    capabilities: [
      { name: 'Docker Compose', level: 'Advanced' },
      { name: 'GitHub Actions', level: 'Advanced' },
      { name: 'Monitoring & Logging', level: 'Intermediate' },
    ],
  },
  {
    title: 'Programming',
    icon: 'Code2',
    capabilities: [
      { name: 'Python', level: 'Expert' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'Bash', level: 'Intermediate' },
    ],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    capabilities: [
      { name: 'Git', level: 'Expert' },
      { name: 'LangSmith', level: 'Advanced' },
      { name: 'Weights & Biases', level: 'Intermediate' },
      { name: 'Linux', level: 'Advanced' },
    ],
  },
];

export type TimelineEntry = {
  type: 'education' | 'internship' | 'hackathon' | 'opensource' | 'achievement';
  title: string;
  org: string;
  period: string;
  description: string;
  icon: string;
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    type: 'internship',
    title: 'Machine Learning Intern',
    org: 'FlyRank AI',
    period: '2025 — Present',
    description:
      'Building and deploying ML systems for production search ranking and content intelligence. Working on retrieval pipelines, model evaluation, and LLM-driven automation that serves real traffic.',
    icon: 'Briefcase',
  },
  {
    type: 'education',
    title: 'B.Tech, Computer Science Engineering',
    org: 'University',
    period: '2023 — 2027',
    description:
      'Building a strong foundation in algorithms, distributed systems, and machine learning. Focusing coursework and projects on intelligent systems and production AI engineering.',
    icon: 'GraduationCap',
  },
  {
    type: 'achievement',
    title: 'Production AI Projects',
    org: 'Independent',
    period: '2024 — Present',
    description:
      'Designed and shipped three production-grade AI systems — document intelligence, career coaching, and repository analysis — each with real architecture, evals, and measurable impact.',
    icon: 'Rocket',
  },
  {
    type: 'hackathon',
    title: 'Hackathon Competitor',
    org: 'Multiple Events',
    period: '2024 — Present',
    description:
      'Competing in AI-focused hackathons, building end-to-end prototypes under time pressure — from problem framing to deployed demo within 24–48 hours.',
    icon: 'Trophy',
  },
  {
    type: 'opensource',
    title: 'Open Source',
    org: 'GitHub',
    period: '2024 — Present',
    description:
      'Contributing to AI tooling and sharing project case studies publicly. Building in the open with clean READMEs, architecture docs, and reproducible setups.',
    icon: 'Github',
  },
];

export const STATS = [
  { label: 'Projects Shipped', value: 3, suffix: '' },
  { label: 'Hackathons', value: 5, suffix: '+' },
  { label: 'Internships', value: 1, suffix: '' },
  { label: 'Certificates', value: 6, suffix: '+' },
  { label: 'GitHub Commits', value: 800, suffix: '+' },
];

export type Certification = {
  title: string;
  issuer: string;
  issuerShort: string;
  period: string;
  icon: string;
  color: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    issuerShort: 'DLAI',
    period: '2024',
    icon: 'BrainCircuit',
    color: 'from-rose-500/20 to-transparent',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'Stanford · Coursera',
    issuerShort: 'STAN',
    period: '2024',
    icon: 'GraduationCap',
    color: 'from-red-500/20 to-transparent',
  },
  {
    title: 'ChatGPT Prompt Engineering for Developers',
    issuer: 'OpenAI · DeepLearning.AI',
    issuerShort: 'OAI',
    period: '2024',
    icon: 'Sparkles',
    color: 'from-emerald-500/20 to-transparent',
  },
  {
    title: 'Building Systems with the ChatGPT API',
    issuer: 'OpenAI · DeepLearning.AI',
    issuerShort: 'OAI',
    period: '2024',
    icon: 'MessageSquare',
    color: 'from-teal-500/20 to-transparent',
  },
  {
    title: 'LangChain for LLM Application Development',
    issuer: 'LangChain · Coursera',
    issuerShort: 'LC',
    period: '2024',
    icon: 'Layers',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    title: 'Databases and SQL for Data Science',
    issuer: 'IBM',
    issuerShort: 'IBM',
    period: '2024',
    icon: 'Database',
    color: 'from-indigo-500/20 to-transparent',
  },
];

export const ABOUT_PRINCIPLES = [
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
    body: 'Guardrails, evals, and repair loops are not afterthoughts. They are the product, especially in regulated or high-stakes domains.',
  },
  {
    icon: 'BrainCircuit',
    title: 'Business value first',
    body: 'Every architecture decision starts with the metric it moves. If a simpler approach wins on the KPI, the simpler approach ships.',
  },
];

export const ABOUT_JOURNEY = [
  { title: 'Computer Science Engineering', desc: 'Foundation in algorithms, systems, and intelligence.' },
  { title: 'Machine Learning Internship', desc: 'Deploying models that serve real traffic at FlyRank AI.' },
  { title: 'Production AI Projects', desc: 'Shipping end-to-end intelligent systems with evals.' },
  { title: 'Hackathons & Open Source', desc: 'Competing and building in the open.' },
];
