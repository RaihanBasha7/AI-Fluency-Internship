import { type ReactNode } from 'react';
import { useSpotlight } from '@/lib/hooks';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  /** Enables the cursor-tracking spotlight glow on the card. */
  spotlight?: boolean;
  /** Adds the soft border/bg hover transition used across cards. */
  hover?: boolean;
  className?: string;
};

/**
 * Glassmorphic card surface used across all sections.
 * Base styling intentionally matches the original design system.
 */
export function Card({ children, spotlight = false, hover = false, className }: Props) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={spotlight ? ref : undefined}
      onMouseMove={spotlight ? onMouseMove : undefined}
      className={cn(
        'glass relative rounded-3xl border border-hairline',
        spotlight && 'card-spotlight',
        hover && 'transition-colors duration-300 hover:border-white/15',
        className,
      )}
    >
      {children}
    </div>
  );
}
