// src/hooks/useMagneticEffect.js
import { useRef, useEffect } from 'react';

/**
 * Applies a magnetic pull effect to a button/element.
 * Cursor within `radius` px causes element to shift max `strength` px.
 * @param {number} radius - Detection radius in px (default 80)
 * @param {number} strength - Max displacement in px (default 20)
 */
export function useMagneticEffect(radius = 80, strength = 20) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = (radius - dist) / radius;
        el.style.transform = `translate(${dx * pull * (strength / radius)}px, ${dy * pull * (strength / radius)}px)`;
      } else {
        el.style.transform = '';
      }
    };

    const onMouseLeave = () => { el.style.transform = ''; };

    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [radius, strength]);

  return ref;
}
