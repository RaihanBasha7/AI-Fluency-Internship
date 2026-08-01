import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

export type TimelineItem = {
  icon: LucideIcon;
  typeLabel: string;
  period: string;
  title: string;
  org: string;
  description: string;
};

type Props = {
  items: TimelineItem[];
};

/**
 * Reusable vertical timeline with an alternating two-column layout on desktop.
 * Styling intentionally matches the approved design system.
 */
export function Timeline({ items }: Props) {
  return (
    <div className="relative">
      {/* vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-accent-blue/40 via-white/10 to-transparent sm:left-1/2" />
      <ol className="space-y-8">
        {items.map((entry, i) => (
          <TimelineRow key={entry.title} entry={entry} leftSide={i % 2 === 0} />
        ))}
      </ol>
    </div>
  );
}

function TimelineRow({ entry, leftSide }: { entry: TimelineItem; leftSide: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12 sm:pl-0"
    >
      <div className="sm:grid sm:grid-cols-2 sm:gap-8">
        {/* node */}
        <span className="absolute left-4 top-5 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-ink-850 text-accent-blue shadow-[0_0_16px_rgba(91,140,255,0.25)] sm:left-1/2">
          <entry.icon className="h-4 w-4" strokeWidth={1.5} />
        </span>

        {/* content card — alternate sides on desktop */}
        <div
          className={`sm:col-span-1 ${leftSide ? 'sm:pr-8 sm:text-right' : 'sm:col-start-2 sm:pl-8'}`}
        >
          <div className="glass group rounded-2xl border border-hairline p-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.04]">
            <div className={`mb-2 flex items-center gap-2 ${leftSide ? 'sm:justify-end' : ''}`}>
              <span className="rounded-full border border-hairline bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/55">
                {entry.typeLabel}
              </span>
              <span className="text-xs text-white/40">{entry.period}</span>
            </div>
            <h4 className="text-base font-semibold text-white">{entry.title}</h4>
            <div className="mt-0.5 text-sm text-accent-blue/80">{entry.org}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{entry.description}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
