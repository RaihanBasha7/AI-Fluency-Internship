import { motion } from 'framer-motion';
import { TextReveal } from '@/components/ui/Reveal';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({ eyebrow, title, description, align = 'left' }: Props) {
  const center = align === 'center';
  return (
    <div
      className={`flex flex-col gap-4 ${center ? 'items-center text-center' : 'items-start text-left'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(79,209,224,0.8)]" />
        {eyebrow}
      </motion.div>
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tightest sm:text-5xl md:text-6xl">
        <TextReveal text={title} />
      </h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg ${center ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
