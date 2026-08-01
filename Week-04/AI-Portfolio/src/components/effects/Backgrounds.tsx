import { motion } from 'framer-motion';
import { useMemo } from 'react';

/** Layered aurora gradient blobs that drift slowly. */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-1/4 top-[-10%] h-[55vh] w-[55vh] rounded-full bg-accent-blue/20 blur-[120px] animate-aurora-slow" />
      <div className="absolute right-[-15%] top-[5%] h-[50vh] w-[50vh] rounded-full bg-accent-violet/20 blur-[130px] animate-aurora-slower" />
      <div className="absolute left-[20%] top-[40%] h-[45vh] w-[45vh] rounded-full bg-accent-cyan/15 blur-[120px] animate-aurora-slow" />
      <div className="absolute right-[25%] bottom-[5%] h-[40vh] w-[40vh] rounded-full bg-accent-violet/15 blur-[110px] animate-aurora-slower" />
    </div>
  );
}

/** Subtle moving grid with radial fade mask. */
export function AnimatedGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-grid animate-grid-pan mask-fade-b opacity-60"
    />
  );
}

/** Floating particle field rendered with deterministic positions. */
export function ParticleField({ count = 28 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i + 1) * 9301;
        const rand = (n: number) => ((seed * n) % 1000) / 1000;
        return {
          id: i,
          left: rand(49297) * 100,
          top: rand(49297 + 7) * 100,
          size: 1 + rand(13) * 2.5,
          duration: 7 + rand(23) * 10,
          delay: rand(31) * 6,
          opacity: 0.2 + rand(17) * 0.5,
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -28, 0],
            x: [0, 10, 0],
            opacity: [p.opacity, p.opacity * 0.4, p.opacity],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/** A faint noise texture overlay to break up flat gradients. */
export function NoiseTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 noise opacity-[0.035] mix-blend-soft-light"
    />
  );
}
