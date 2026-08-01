import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';

export type StatItem = {
  label: string;
  value: number;
  suffix: string;
};

type StatsProps = {
  items: readonly StatItem[];
};

/** Animated stats grid. Styling matches the approved design system. */
export function Stats({ items }: StatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06}>
          <div className="glass group relative overflow-hidden rounded-2xl border border-hairline p-5 text-center transition-colors duration-300 hover:border-white/15">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="text-3xl font-semibold tracking-tightest text-white sm:text-4xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
              {s.label}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Animated number that counts up when scrolled into view. */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
