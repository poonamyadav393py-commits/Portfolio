import { useEffect, useRef } from 'react';

/**
 * useParallax hook
 * @param {number} speed - The speed of the parallax effect (e.g., 0.1, -0.2)
 * @param {boolean} horizontal - Whether to move horizontally instead of vertically
 * @returns {React.RefObject} - Ref to attach to the element
 */
export function useParallax(speed = 0.1, horizontal = false) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    let rafId;
    let currentPos = 0;
    let targetPos = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            update();
          } else {
            cancelAnimationFrame(rafId);
          }
        });
      },
      { rootMargin: '100px 0px' }
    );

    observer.observe(element);

    const onScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      
      const diff = windowCenter - elementCenter;
      targetPos = diff * speed;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    const update = () => {
      currentPos += (targetPos - currentPos) * 0.1;
      
      if (Math.abs(targetPos - currentPos) > 0.05) {
        if (horizontal) {
          element.style.transform = `translate3d(${-currentPos}px, 0, 0)`;
        } else {
          element.style.transform = `translate3d(0, ${-currentPos}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(update);
    };

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
      if (element) {
        element.style.transform = 'translate3d(0, 0, 0)';
      }
    };
  }, [speed, horizontal]);

  return ref;
}
