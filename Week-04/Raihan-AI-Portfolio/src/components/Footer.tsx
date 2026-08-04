import { ArrowUp, Github, Hexagon, Linkedin, Mail, type LucideIcon } from 'lucide-react';
import { NAV_ITEMS, SOCIALS } from '@/lib/data';

export function Footer() {
  return (
    <footer className="relative border-t border-hairline px-6 py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <Hexagon className="h-8 w-8 text-accent-blue/70 transition-transform duration-500 group-hover:rotate-180" strokeWidth={1.2} />
              <span className="absolute h-2 w-2 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan" />
            </span>
            <span className="font-serif text-lg text-white">
              Raihan<span className="text-white/40"> Basha</span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <FooterSocial href={SOCIALS.github} icon={Github} label="GitHub" />
            <FooterSocial href={SOCIALS.linkedin} icon={Linkedin} label="LinkedIn" />
            <FooterSocial href={SOCIALS.email} icon={Mail} label="Email" />
            <a
              href="#home"
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-xl border border-hairline bg-white/[0.03] text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 sm:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Shaik Raihan Basha. Designed & built with intent.
          </p>
          <p className="font-mono text-[11px] text-white/30">
            React · TypeScript · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterSocial({
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
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-xl border border-hairline bg-white/[0.03] text-white/60 transition-colors hover:bg-white/[0.07] hover:text-white"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </a>
  );
}
