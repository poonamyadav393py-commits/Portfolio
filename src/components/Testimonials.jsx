import React from 'react';
// src/components/Testimonials.jsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { testimonials } from '../data/testimonials';

/** Auto-scrolling testimonial carousel */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const [headRef, headVisible] = useInView(0.2);

  const goTo = (i) => {
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="section overflow-hidden" style={{ background: 'var(--bg)' }} aria-labelledby="testimonials-heading">
      <div className="container">
        {/* Header */}
        <div ref={headRef} className={`reveal mb-16 ${headVisible ? 'visible' : ''}`}>
          <p className="label mb-4" style={{ color: 'var(--accent)' }}>Kind words</p>
          <h2 id="testimonials-heading" className="font-serif text-white">
            What people say
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl" aria-live="polite" aria-atomic="true">
          {/* Giant quote mark */}
          <div
            aria-hidden="true"
            className="font-serif text-accent/20 select-none leading-none mb-6"
            style={{ fontSize: 'clamp(80px, 12vw, 140px)', lineHeight: 1 }}
          >
            "
          </div>

          {/* Quote text */}
          <blockquote key={t.id} className="mb-12" style={{ animation: 'fadeIn 0.5s ease' }}>
            <p className="font-serif text-white/90 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light mb-8">
              {t.quote}
            </p>
            <footer className="flex items-center gap-5">
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-serif font-bold text-sm text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--surface))' }}
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div>
                <p className="font-sans font-semibold text-white text-sm">{t.name}</p>
                <p className="font-sans text-white/50 text-xs mt-0.5">
                  {t.role} · {t.company}
                </p>
              </div>
            </footer>
          </blockquote>

          {/* Dots navigation */}
          <div className="flex gap-3" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-500 cursor-none ${
                  i === active ? 'w-8 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Decorative right-side element */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-5"
        >
          <svg viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="140" stroke="white" strokeWidth="1" strokeDasharray="6 12"/>
            <circle cx="160" cy="160" r="90" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 8"/>
            <circle cx="160" cy="160" r="40" fill="white" opacity="0.3"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
