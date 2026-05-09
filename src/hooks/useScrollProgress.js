// src/hooks/useScrollProgress.js
import { useState, useEffect } from 'react';

/**
 * Tracks scroll progress as a 0–1 value for the scroll progress bar.
 * @returns {number} progress - 0 to 1
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}
