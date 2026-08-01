export type Project = {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  businessValue: string;
  github: string;
  demo: string;
  caseStudy: string;
  /** Tailwind gradient classes used for the card header accent. */
  accent: string;
  /** Lucide icon name resolved by the feature. */
  icon: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'extractiq',
    name: 'ExtractIQ Engine',
    tagline: 'Production-grade document intelligence at scale.',
    problem:
      'Enterprises spend thousands of analyst-hours manually extracting structured data from contracts, invoices and research reports — slow, error-prone and impossible to audit.',
    solution:
      'A multi-agent LLM pipeline that ingests heterogeneous documents, classifies them, and emits validated JSON aligned to a per-client schema — with human-in-the-loop review for low-confidence fields.',
    architecture:
      'Async ingestion queue → OCR + layout parser → router agent → specialized extractor agents → schema validator → review queue. Cached embeddings for semantic deduplication.',
    techStack: [
      'Python',
      'LangGraph',
      'GPT-4o',
      'Pydantic',
      'Postgres',
      'Redis',
      'FastAPI',
      'Unstructured.io',
    ],
    businessValue:
      'Cut document processing time by 83% for a pilot client and reduced extraction errors to under 2%, unlocking a previously unprofitable compliance workflow.',
    github: 'https://github.com/raihanbasha',
    demo: '#',
    caseStudy: '#',
    accent: 'from-blue-500/30 via-indigo-500/20 to-transparent',
    icon: 'ScanText',
  },
  {
    id: 'echoops',
    name: 'EchoOps AI',
    tagline: 'Conversational memory that remembers what matters.',
    problem:
      'Support and success teams lose context across sessions — every conversation starts from zero, forcing customers to repeat themselves and agents to re-investigate.',
    solution:
      'A long-term memory layer that distills each interaction into structured memory objects, ranks them by relevance and decay, and injects the right context into the next turn automatically.',
    architecture:
      'Event stream → memory extractor (LLM) → vector + graph store → retrieval router → prompt assembler. Time-decayed re-ranking with recency and salience weights.',
    techStack: ['TypeScript', 'Node.js', 'pgvector', 'OpenAI', 'Neo4j', 'Prisma', 'tRPC'],
    businessValue:
      'Reduced average handle time by 31% and lifted first-contact resolution by 18% in a 90-day pilot with a SaaS support team.',
    github: 'https://github.com/raihanbasha',
    demo: '#',
    caseStudy: '#',
    accent: 'from-cyan-400/30 via-sky-500/20 to-transparent',
    icon: 'BrainCircuit',
  },
  {
    id: 'smartprep',
    name: 'SmartPrep AI',
    tagline: 'An adaptive interview coach that evolves with you.',
    problem:
      'Generic interview prep is static — it cannot adapt to a candidate’s evolving weak spots, target role, or the specific signals top companies evaluate.',
    solution:
      'A personalized coach that profiles strengths and gaps from practice sessions, generates targeted questions, and delivers calibrated feedback with a measurable readiness score.',
    architecture:
      'Session recorder → skill graph builder → adaptive question generator → rubric grader (LLM judge) → progress dashboard. Spaced-repetition scheduler for weak topics.',
    techStack: ['React', 'Next.js', 'Python', 'FastAPI', 'Supabase', 'OpenAI', 'Tailwind'],
    businessValue:
      'Helped 1,200+ early users raise mock-interview scores by an average of 24% over four weeks; selected as a hackathon finalist.',
    github: 'https://github.com/raihanbasha',
    demo: '#',
    caseStudy: '#',
    accent: 'from-violet-500/30 via-fuchsia-500/20 to-transparent',
    icon: 'GraduationCap',
  },
];
