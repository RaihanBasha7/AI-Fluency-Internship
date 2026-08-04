import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Database,
  GraduationCap,
  Layers,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { staggerContainer, staggerItem } from '@/components/Reveal';
import { useSpotlight } from '@/lib/hooks';
import { CERTIFICATIONS } from '@/lib/data';

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit,
  GraduationCap,
  Sparkles,
  MessageSquare,
  Layers,
  Database,
};

export function Certifications() {
  return (
    <section id="certifications" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Certifications"
          title="Continuously learning"
          description="Formal credentials backing the engineering work — focused on deep learning, LLMs, and the systems that support them."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CERTIFICATIONS.map((cert) => {
            const Icon = ICONS[cert.icon] ?? Sparkles;
            return <CertCard key={cert.title} title={cert.title} issuer={cert.issuer} issuerShort={cert.issuerShort} period={cert.period} icon={Icon} color={cert.color} />;
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CertCard({
  title,
  issuer,
  issuerShort,
  period,
  icon: Icon,
  color,
}: {
  title: string;
  issuer: string;
  issuerShort: string;
  period: string;
  icon: LucideIcon;
  color: string;
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  return (
    <motion.div variants={staggerItem}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="card-spotlight glass group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-hairline p-5 transition-colors duration-300 hover:border-white/15"
      >
        {/* Issuer logo placeholder */}
        <div className={`relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-hairline bg-gradient-to-br ${color}`}>
          <Icon className="h-5 w-5 text-white/80" strokeWidth={1.5} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-md border border-hairline bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/50">
              {issuerShort}
            </span>
            <span className="text-xs text-white/35">{period}</span>
          </div>
          <h3 className="mt-2 text-sm font-semibold leading-snug text-white">{title}</h3>
          <p className="mt-1 text-xs text-white/45">{issuer}</p>
        </div>
      </div>
    </motion.div>
  );
}
