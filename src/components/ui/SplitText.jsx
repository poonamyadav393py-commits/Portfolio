import React from 'react';
// src/components/ui/SplitText.jsx
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Splits text into individual character spans and animates them in
 * when the parent element enters the viewport.
 * @param {string} text - The text to split
 * @param {string} className - CSS classes for the wrapper
 * @param {number} delay - Base delay in ms before animation starts
 */
export function SplitText({ text, className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const chars = el.querySelectorAll('.char-inner');
          chars.forEach((c, i) => {
            setTimeout(() => {
              c.classList.add('visible');
            }, delay + i * 40);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="char" aria-hidden="true">
          <span className="char-inner">
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
}

SplitText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
};
