import { motion } from 'framer-motion';
import { useScrollProgress } from '@/lib/hooks';

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: progress,
        background: 'linear-gradient(90deg, #5b8cff 0%, #8b7cff 50%, #4fd1e0 100%)',
      }}
    />
  );
}
