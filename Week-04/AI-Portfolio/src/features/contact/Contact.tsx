import { ArrowUpRight, Check, Github, Linkedin, Mail, Send, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { useSpotlight } from '@/lib/hooks';
import { siteConfig, SOCIALS } from '@/data/site';

export function Contact() {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 2600);
  };

  return (
    <Section
      id="contact"
      background={
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full bg-accent-violet/10 blur-[150px]" />
      }
    >
      <SectionHeader
        eyebrow="Contact"
        title="Let’s build something that ships"
        description="Recruiting for an AI Engineering internship, or have a hard problem worth solving? I read every message."
        align="center"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-5">
        {/* CTA + socials */}
        <Reveal className="lg:col-span-2">
          <div className="glass flex h-full flex-col justify-between rounded-3xl border border-hairline p-7">
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline bg-gradient-to-br from-accent-blue/20 to-transparent text-accent-cyan">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold leading-tight text-white">
                Open to <span className="text-aurora">AI Engineering</span> internships
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Based in India, available remotely. I’m especially interested in teams building LLM
                applications, agentic systems, and ML infrastructure.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <Button href={SOCIALS.email} variant="primaryWide" className="group">
                <Mail className="h-4 w-4" />
                {siteConfig.email}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <SocialLink href={SOCIALS.github} icon={Github} label="GitHub" />
                <SocialLink href={SOCIALS.linkedin} icon={Linkedin} label="LinkedIn" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1} className="lg:col-span-3">
          <div
            ref={ref}
            onMouseMove={onMouseMove}
            className="card-spotlight glass h-full rounded-3xl border border-hairline p-7"
          >
            <form onSubmit={handleSubmit} className="flex h-full flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  id="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Ada Lovelace"
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="ada@gmail/company.com"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label
                  htmlFor="message"
                  className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about the role or the problem you’re solving…"
                  className="flex-1 resize-none rounded-xl border border-hairline bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors duration-200 focus:border-accent-blue/50 focus:bg-white/[0.04] focus:outline-none"
                />
              </div>
              <Button variant="light" magnetic={false} type="submit" disabled={sent}>
                {sent ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    Message sent
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-white/45"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-hairline bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors duration-200 focus:border-accent-blue/50 focus:bg-white/[0.04] focus:outline-none"
      />
    </div>
  );
}

function SocialLink({
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
      className="group inline-flex items-center justify-center gap-2 rounded-xl border border-hairline bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:border-accent-blue/40 hover:bg-white/[0.07] hover:text-white"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
      {label}
    </a>
  );
}
