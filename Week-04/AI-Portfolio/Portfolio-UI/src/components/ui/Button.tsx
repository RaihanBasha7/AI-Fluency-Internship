import { type ReactNode } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

export type ButtonVariant =
  'primary' | 'ghost' | 'ghostCompact' | 'primaryCompact' | 'primaryWide' | 'light';

/** Exact class sets from the approved design system — do not modify. */
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet px-5 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(91,140,255,0.35)]',
  ghost:
    'rounded-xl border border-hairline bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.07] hover:text-white',
  ghostCompact:
    'rounded-xl border border-hairline bg-white/[0.03] px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white',
  primaryCompact:
    'rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet px-4 py-2 text-sm font-medium text-white shadow-[0_4px_20px_rgba(91,140,255,0.35)] transition-shadow hover:shadow-[0_6px_28px_rgba(91,140,255,0.5)]',
  primaryWide:
    'w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet px-5 py-3.5 text-sm font-medium text-white shadow-[0_8px_30px_rgba(91,140,255,0.3)]',
  light:
    'self-start rounded-xl bg-white px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] disabled:opacity-70',
};

const ELEMENT_BASE = 'btn-ripple inline-flex items-center justify-center gap-2';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
  variant?: ButtonVariant;
  className?: string;
  /** Enables the magnetic cursor pull. Defaults to true for pointer interactions. */
  magnetic?: boolean;
};

/** Reusable button/link in every approved variant. */
export function Button({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  ariaLabel,
  variant = 'primary',
  className,
  magnetic = true,
}: Props) {
  const cls = cn(VARIANTS[variant], className);

  if (magnetic && !disabled && type === 'button') {
    return (
      <MagneticButton href={href} onClick={onClick} ariaLabel={ariaLabel} className={cls}>
        {children}
      </MagneticButton>
    );
  }

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={cn(ELEMENT_BASE, cls)}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(ELEMENT_BASE, cls)}
    >
      {children}
    </button>
  );
}
