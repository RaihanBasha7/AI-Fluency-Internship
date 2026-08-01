import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
};

/** A button/link that subtly pulls toward the cursor while hovered. */
export function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.35,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `btn-ripple inline-flex items-center justify-center gap-2 ${className}`;

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-flex w-full items-center justify-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={cls}
        whileTap={{ scale: 0.96 }}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cls}
      whileTap={{ scale: 0.96 }}
    >
      {inner}
    </motion.button>
  );
}
