import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

/** A soft glow that follows the cursor with spring smoothing. Pointer-events disabled. */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 25, mass: 0.4 });
  const bg = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(91,140,255,0.10), rgba(139,124,255,0.05) 35%, transparent 70%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
    />
  );
}
