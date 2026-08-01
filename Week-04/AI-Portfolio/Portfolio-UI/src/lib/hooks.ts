import { useEffect, useRef, useState } from 'react';

/** Tracks scroll progress 0..1 across the whole document. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}

/** Returns true once the page has scrolled past `threshold` px. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** Global mouse position (0..1 of viewport), throttled via rAF. */
export function useMousePosition() {
  const ref = useRef({ x: 0.5, y: 0.5 });
  const [, force] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
        force((n) => (n + 1) % 1e9);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref.current;
}

/** Per-element mouse coords for spotlight cards, in px relative to element. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return { ref, onMouseMove };
}
