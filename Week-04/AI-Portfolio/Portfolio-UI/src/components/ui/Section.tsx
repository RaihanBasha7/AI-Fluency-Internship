import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  id: string;
  children: ReactNode;
  /** Optional decorative absolute-positioned backdrop rendered behind content. */
  background?: ReactNode;
  className?: string;
  /** Extra classes applied to the inner max-width container. */
  containerClassName?: string;
};

/** Standard page section with consistent vertical rhythm and content container. */
export function Section({ id, children, background, className, containerClassName }: Props) {
  return (
    <section id={id} className={cn('relative px-6 py-28 sm:py-36', className)}>
      {background}
      <div className={cn('mx-auto max-w-6xl', containerClassName)}>{children}</div>
    </section>
  );
}
