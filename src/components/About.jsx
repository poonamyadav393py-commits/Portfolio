import React from 'react';
// src/components/About.jsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useParallax } from '../hooks/useParallax';

/** Animated count-up number */
function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.3);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

/** Philosophy card */
function PhilosophyCard({ icon, title, description, delay }) {
  const [ref, visible] = useInView(0.2);
  const parallaxRef = useParallax(0.05);

  return (
    <div
      ref={ref}
      className="reveal p-8 bg-surface rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-xl transition-all duration-500 group"
      style={{ transitionDelay: `${delay}ms`, ...(visible ? { opacity: 1, transform: 'translateY(0)' } : {}) }}
    >
      <div ref={parallaxRef} className="text-4xl mb-5 inline-block" aria-hidden="true">{icon}</div>
      <h3 className="font-serif text-primary text-xl mb-3">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

const philosophy = [
  {
    icon: '🔍',
    title: 'Research First',
    description: 'Every design decision is rooted in evidence. I start with questions, not screens — listening to users before opening Figma.',
  },
  {
    icon: '🧩',
    title: 'Systems Thinker',
    description: 'I design components that scale. From atoms to flows, I build design systems that grow with the product and empower engineering teams.',
  },
  {
    icon: '📖',
    title: 'Story-driven',
    description: 'Good design tells a story. I craft user journeys with narrative clarity — each interaction purposeful, each moment earned.',
  },
];

const stats = [
  // { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 12, suffix: '+', label: 'Products Shipped' },
  { value: 5, suffix: '', label: 'Industries' },
  { value: 100, suffix: '%', label: 'User-Centred' },
];

export default function About() {
  const [sectionRef, sectionVisible] = useInView(0.1);
  const imgParallaxRef = useParallax(0.12);

  return (
    <section id="about" className="section bg-bg relative overflow-hidden" aria-labelledby="about-heading">
      <div className="container relative z-10">

        {/* Label */}
        <p className="label mb-16 text-accent">About me</p>

        {/* Two-column: pull quote + bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

          {/* Pull quote */}
          <div ref={sectionRef} className={`reveal ${sectionVisible ? 'visible' : ''}`}>
            <blockquote>
              <p className="font-serif text-primary text-3xl md:text-4xl lg:text-5xl leading-tight font-light mb-8">
                "I believe great design is invisible — it simply feels right."
              </p>
              <footer className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-surface shadow-sm"
                >
                  <img src="/poonam3.jpeg" alt="Poonam Yadav" className="w-full h-full object-cover scale-150 translate-y-[25%]" style={{ filter: 'grayscale(15%) contrast(1.05) brightness(0.98)' }} />
                </div>
                <div>
                  <p className="font-sans font-semibold text-text text-sm">Poonam Yadav</p>
                  <p className="text-muted text-xs">Product Designer @ Kavish Technology</p>
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Bio + portrait */}
          <div className="flex flex-col gap-8">
            {/* Portrait */}
            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-primary/5 flex items-center justify-center group shadow-2xl"
              aria-label="Poonam Yadav — designer portrait"
            >
              <img
                ref={imgParallaxRef}
                src="/poonam2.jpeg"
                alt="Poonam Yadav portrait"
                className="absolute inset-0 w-full h-[120%] -top-[20%] object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ filter: 'grayscale(15%) contrast(1.05) brightness(0.95)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent pointer-events-none mix-blend-multiply" />
            </div>

            {/* Bio text */}
            <div className="space-y-4">
              <p className="text-text/80 text-base leading-relaxed">
                I'm a Product Designer currently shaping the future of AI-powered hiring at Kavish Technology, where I designed
                EPLOYRS - a job-tech platform - from zero to launch.
              </p>
              <p className="text-muted text-base leading-relaxed">
                With a deep love for research and a systems-first mindset, I bridge the gap between
                business goals and human needs - turning complex, ambiguous problems into products
                that people actually enjoy using.
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        {/* <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mb-24 py-12 border-y border-gray-100">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <p className="font-serif text-primary text-5xl md:text-6xl font-bold mb-2">
                <CountUp target={value} suffix={suffix} />
              </p>
              <p className="label">{label}</p>
            </div>
          ))}
        </div> */}

        {/* Philosophy cards */}
        <div>
          <p className="label mb-10 text-muted">My approach</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophy.map((card, i) => (
              <PhilosophyCard key={card.title} {...card} delay={i * 120} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
