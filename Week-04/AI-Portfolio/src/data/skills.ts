export type SkillCategory = {
  title: string;
  icon: string;
  skills: string[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    icon: 'Code2',
    skills: ['Python', 'TypeScript', 'Go', 'SQL', 'Bash'],
  },
  {
    title: 'AI / ML',
    icon: 'BrainCircuit',
    skills: [
      'PyTorch',
      'LangChain',
      'LangGraph',
      'OpenAI API',
      'RAG',
      'Fine-tuning',
      'Embeddings',
      'Vector Search',
    ],
  },
  {
    title: 'Backend',
    icon: 'Server',
    skills: ['FastAPI', 'Node.js', 'gRPC', 'REST', 'WebSockets', 'Celery'],
  },
  {
    title: 'Cloud',
    icon: 'Cloud',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    title: 'Databases',
    icon: 'Database',
    skills: ['PostgreSQL', 'pgvector', 'Redis', 'Neo4j', 'MongoDB', 'Supabase'],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'Linux', 'LangSmith', 'Weights & Biases', 'Jupyter', 'Postman'],
  },
];
