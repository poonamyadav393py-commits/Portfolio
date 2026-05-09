// src/components/Process.jsx
import React from 'react';
import { useInView } from '../hooks/useInView';
import { useParallax } from '../hooks/useParallax';

const steps = [
  {
    num: '01',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="14" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="16" cy="12" r="4" fill="var(--accent)" opacity="0.7" />
        <path d="M8 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Discover',
    color: '#E0D4F6',
    description: 'Deep user research, stakeholder interviews, and competitive analysis. I ask more questions than anyone is comfortable with — because that is where the real problems hide.',
  },
  {
    num: '02',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M4 12h24M12 12v16" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="var(--accent)" opacity="0.6" />
      </svg>
    ),
    title: 'Define',
    color: '#B388FF',
    description: 'Synthesising research into personas, journey maps, and a razor-sharp problem statement. This is the phase where fog becomes a clear direction everyone can rally behind.',
  },
  {
    num: '03',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="var(--accent)" strokeWidth="1.5" />
        <rect x="10" y="10" width="5" height="5" rx="1" fill="var(--accent)" opacity="0.5" />
        <rect x="17" y="10" width="5" height="5" rx="1" fill="var(--accent)" opacity="0.3" />
        <rect x="10" y="17" width="12" height="3" rx="1" fill="var(--accent)" opacity="0.4" />
      </svg>
    ),
    title: 'Design',
    color: '#2C4A2E',
    description: 'Wireframes evolve into high-fidelity prototypes, backed by a robust design system. Every component is intentional; every interaction is earned through iteration.',
  },
  {
    num: '04',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 16l7 7L26 9" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="13" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    title: 'Deliver',
    color: '#3D2C5E',
    description: 'Developer-ready handoff with annotated specs, component documentation, and active collaboration during build. Then I measure, learn, and iterate — because launch is just the beginning.',
  },
];

/** Single process step */
function ProcessStep({ step, index }) {
  const [ref, visible] = useInView(0.2);
  const numParallax = useParallax(0.08);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`reveal flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'
        } ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Number + Icon block */}
      <div className="flex-shrink-0 flex items-center gap-6 md:w-64">
        <div ref={numParallax} className="pointer-events-none">
          <span
            className="font-serif font-bold text-7xl leading-none select-none"
            style={{ color: step.color, opacity: 0.15 }}
            aria-hidden="true"
          >
            {step.num}
          </span>
        </div>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}
        >
          {step.icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-12 md:pb-0 border-b md:border-b-0 border-gray-100">
        <p className="label mb-3" style={{ color: step.color }}>Step {step.num}</p>
        <h3 className="font-serif text-primary text-3xl md:text-4xl mb-4">{step.title}</h3>
        <p className="text-muted text-base leading-relaxed max-w-md">{step.description}</p>
      </div>

      {/* Connector line (desktop) */}
      {index < steps.length - 1 && (
        <div aria-hidden="true" className="hidden md:block absolute right-0 w-px h-20 bg-gray-100 translate-x-1/2" />
      )}
    </div>
  );
}

export default function Process() {
  const [headRef, headVisible] = useInView(0.2);

  return (
    <section id="process" className="section bg-surface" aria-labelledby="process-heading">
      <div className="container">
        {/* Header */}
        <div ref={headRef} className={`reveal mb-20 ${headVisible ? 'visible' : ''}`}>
          <p className="label mb-4 text-accent">How I work</p>
          <h2 id="process-heading" className="font-serif text-primary max-w-lg">
            A process built<br />
            <em className="not-italic text-accent">for clarity.</em>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col gap-16 md:gap-20">
          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
