import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'pill' | 'chip' | 'skill' | 'outline';

/** Exact class sets from the approved design system — do not modify. */
const VARIANTS: Record<BadgeVariant, string> = {
  pill: 'glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/70',
  chip: 'rounded-md border border-hairline bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-white/65 transition-colors duration-200 hover:border-accent-blue/40 hover:text-white',
  skill:
    'group/badge relative cursor-default rounded-lg border border-hairline bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-blue/40 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_18px_rgba(91,140,255,0.25)]',
  outline:
    'rounded-full border border-hairline bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/55',
};

type Props = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

/** Small pill/chip used for availability, tech stacks, and labels. */
export function Badge({ children, variant = 'pill', className }: Props) {
  return <span className={cn(VARIANTS[variant], className)}>{children}</span>;
}
