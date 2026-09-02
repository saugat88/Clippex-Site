import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from './index';

/* Observe an element and report when it first scrolls into view. */
export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, options]);

  return { ref, inView };
}

/* Fade + rise a block into view on scroll, with optional stagger delay. */
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'section' | 'li' }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={cx('reveal', inView && 'is-visible', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* Count a number up from 0 when it enters view. */
export function CountUp({ value, prefix = '', suffix = '', decimals = 0, duration = 1400, className }: { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
