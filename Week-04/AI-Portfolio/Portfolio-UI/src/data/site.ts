/**
 * Central site configuration.
 *
 * Single source of truth for personal branding, links, and SEO metadata.
 * Replace the placeholder values below with your real production details
 * (domain, GitHub, LinkedIn, email, resume link).
 */
export const siteConfig = {
  name: 'Raihan Basha',
  fullName: 'Shaik Raihan Basha',
  initials: 'RB',
  role: 'AI Engineer',
  tagline: 'Computer Science Engineering student & aspiring AI Engineer',
  headline: 'Building production-ready AI systems that solve real business problems.',
  description:
    "Hi, I'm Raihan Basha, a Computer Science Engineering student and aspiring AI Engineer passionate about building production-ready AI systems. I specialize in Machine Learning, LLM applications, backend engineering, and intelligent automation that solve real-world business problems.",
  availability: 'Open to AI Engineering Internships • 2026',
  location: 'India · Remote-friendly',
  email: 'raihanshaik676@gmail.com',
  github: 'https://github.com/RaihanBasha7',
  linkedin: 'https://www.linkedin.com/in/shaikraihanbasha',
  resumeUrl: '/resume.pdf',
  url: 'https://raihanbasha.dev',
  twitter: '@Raihanshaik676',
} as const;

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIALS = {
  github: siteConfig.github,
  linkedin: siteConfig.linkedin,
  email: `mailto:${siteConfig.email}`,
} as const;
