// src/components/Skills.jsx
import React from 'react';
import { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { skills, tools, certifications } from '../data/skills';

/** Inline SVG tool icons — no external icon lib needed */
const toolIcons = {
  Figma: (
    <svg viewBox="0 0 38 57" width="18" height="18" aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
    </svg>
  ),
  FigJam: (
    <svg viewBox="0 0 38 57" width="18" height="18" aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#60CFBA"/>
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#60CFBA"/>
      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#F7C948"/>
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
    </svg>
  ),
  Miro: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#FFD02F"/>
      <text x="4" y="17" fontFamily="serif" fontWeight="700" fontSize="13" fill="#050038">M</text>
    </svg>
  ),
  Photoshop: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#001E36"/>
      <text x="3.5" y="17" fontFamily="serif" fontWeight="700" fontSize="12" fill="#31A8FF">Ps</text>
    </svg>
  ),
  Illustrator: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#330000"/>
      <text x="3" y="17" fontFamily="serif" fontWeight="700" fontSize="12" fill="#FF9A00">Ai</text>
    </svg>
  ),
  Canva: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect width="24" height="24" rx="12" fill="#7D2AE7"/>
      <text x="5" y="17" fontFamily="serif" fontWeight="700" fontSize="12" fill="white">C</text>
    </svg>
  ),
};

/** Animated skill bar */
function SkillBar({ name, level, delay }) {
  const barRef = useRef(null);
  const [ref, visible] = useInView(0.2);

  useEffect(() => {
    if (!visible) return;
    const bar = barRef.current;
    if (!bar) return;
    setTimeout(() => {
      bar.style.width = `${level}%`;
    }, delay);
  }, [visible, level, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="font-sans text-sm font-medium text-text">{name}</span>
        <span
          className="font-sans text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={`${level}%`}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-1.5 bg-gray-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name}: ${level}%`}
      >
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: 0,
            background: 'linear-gradient(90deg, var(--primary), var(--accent))',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/** Tool pill */
function ToolPill({ name }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-surface rounded-xl border border-gray-100 hover:border-accent/40 hover:shadow-md transition-all duration-300 group cursor-none">
      <span className="flex-shrink-0" aria-hidden="true">
        {toolIcons[name] || (
          <span className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
            {name[0]}
          </span>
        )}
      </span>
      <span className="font-sans text-sm font-medium text-text">{name}</span>
    </div>
  );
}

/** Certification row */
function CertItem({ name, index }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div
      ref={ref}
      className={`reveal flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-accent" />
      </div>
      <span className="font-sans text-sm text-text">{name}</span>
    </div>
  );
}

export default function Skills() {
  const [headRef, headVisible] = useInView(0.2);

  return (
    <section id="skills" className="section bg-bg" aria-labelledby="skills-heading">
      <div className="container">
        {/* Header */}
        <div ref={headRef} className={`reveal mb-20 ${headVisible ? 'visible' : ''}`}>
          <p className="label mb-4 text-accent">Expertise</p>
          <h2 id="skills-heading" className="font-serif text-primary">
            Skills & Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Skills bars */}
          <div>
            <p className="label mb-8 text-muted">Core skills</p>
            <div className="flex flex-col gap-6">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 80} />
              ))}
            </div>
          </div>

          {/* Tools + Certifications */}
          <div className="flex flex-col gap-16">
            {/* Tools */}
            <div>
              <p className="label mb-8 text-muted">Tools I use</p>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <ToolPill key={tool.name} name={tool.name} icon={tool.icon} />
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="label mb-4 text-muted">Certifications</p>
              <div>
                {certifications.map((cert, i) => (
                  <CertItem key={cert} name={cert} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
