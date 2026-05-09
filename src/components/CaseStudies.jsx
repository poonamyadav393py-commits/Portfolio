import React from 'react';
// src/components/CaseStudies.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { useParallax } from '../hooks/useParallax';
import { Badge } from './ui/Badge';
import { projects } from '../data/projects';

/** Unique abstract SVG illustration per project */
function ProjectIllustration({ id, color }) {
  const illustrations = {
    '01': (
      // EPLOYRS — AI nodes / job graph
      <svg viewBox="0 0 200 140" fill="none" aria-hidden="true">
        <circle cx="100" cy="70" r="28" fill="white" opacity="0.12" />
        <circle cx="100" cy="70" r="16" fill="white" opacity="0.2" />
        {[[40,35],[160,35],[40,105],[160,105],[100,20],[100,120]].map(([cx,cy],i)=>(
          <g key={i}>
            <line x1="100" y1="70" x2={cx} y2={cy} stroke="white" strokeWidth="0.8" opacity="0.2"/>
            <circle cx={cx} cy={cy} r="5" fill="white" opacity="0.25"/>
          </g>
        ))}
        <text x="100" y="75" textAnchor="middle" fill="white" opacity="0.6" fontSize="11" fontFamily="Inter">AI</text>
      </svg>
    ),
    '02': (
      // Retirewell — bar chart
      <svg viewBox="0 0 200 140" fill="none" aria-hidden="true">
        {[30,50,70,95,120].map((h,i)=>(
          <rect key={i} x={25+i*34} y={130-h} width="22" height={h} rx="4" fill="white" opacity={0.1+i*0.06}/>
        ))}
        <line x1="20" y1="130" x2="185" y2="130" stroke="white" strokeWidth="0.8" opacity="0.3"/>
        <path d="M25 100 Q75 60 110 80 Q145 100 185 30" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="4 3"/>
      </svg>
    ),
    '03': (
      // FitEats — leaf / plate
      <svg viewBox="0 0 200 140" fill="none" aria-hidden="true">
        <circle cx="100" cy="70" r="50" stroke="white" strokeWidth="1" opacity="0.15"/>
        <circle cx="100" cy="70" r="35" fill="white" opacity="0.08"/>
        <path d="M80 50 Q100 30 120 50 Q130 70 100 90 Q70 70 80 50Z" fill="white" opacity="0.2"/>
        <line x1="100" y1="50" x2="100" y2="90" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      </svg>
    ),
    '04': (
      // Talenlio — document / flow
      <svg viewBox="0 0 200 140" fill="none" aria-hidden="true">
        <rect x="55" y="20" width="90" height="110" rx="8" fill="white" opacity="0.08" stroke="white" strokeWidth="0.8" strokeOpacity="0.2"/>
        {[40,58,76,94].map((y,i)=>(
          <rect key={i} x="72" y={y} width={i===0?60:40} height="6" rx="3" fill="white" opacity={0.15+i*0.04}/>
        ))}
        <circle cx="65" cy="40" r="5" fill="white" opacity="0.3"/>
        <circle cx="65" cy="58" r="5" fill="white" opacity="0.2"/>
      </svg>
    ),
    '05': (
      // CryptoMoney — coin / chart
      <svg viewBox="0 0 200 140" fill="none" aria-hidden="true">
        <circle cx="100" cy="70" r="45" stroke="white" strokeWidth="1.5" opacity="0.15"/>
        <circle cx="100" cy="70" r="32" stroke="white" strokeWidth="0.8" opacity="0.1"/>
        <path d="M60 90 L80 60 L105 75 L130 40 L160 55" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4"/>
        <circle cx="160" cy="55" r="4" fill="white" opacity="0.5"/>
        <text x="100" y="75" textAnchor="middle" fill="white" opacity="0.4" fontSize="16" fontFamily="serif">₿</text>
      </svg>
    ),
  };
  return illustrations[id] || null;
}

/** Single project card with hover reveal */
function ProjectCard({ project, large = false }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.15);
  const numParallax = useParallax(0.08);

  return (
    <article
      ref={ref}
      className={`reveal group relative rounded-3xl overflow-hidden cursor-none transition-all duration-700 ${
        large ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
      } ${visible ? 'visible' : ''}`}
      style={{ background: project.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Case study: ${project.title} — ${project.subtitle}`}
    >
      {/* Illustration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60 scale-110">
        <div className="w-full h-full max-w-xs">
          <ProjectIllustration id={project.id} color={project.color} />
        </div>
      </div>

      {/* Project number */}
      <div ref={numParallax} className="absolute top-6 left-8 z-10 pointer-events-none">
        <span className="font-serif text-7xl font-bold text-white/8 select-none leading-none">
          {project.id}
        </span>
      </div>

      {/* Persistent bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
        <h3 className="font-serif text-white text-2xl md:text-3xl font-semibold leading-tight">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm font-sans mt-1">{project.subtitle}</p>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end p-8 transition-all duration-500"
        style={{
          background: `linear-gradient(to top, ${project.color}F5 40%, ${project.color}CC 100%)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
        <h3 className="font-serif text-white text-2xl md:text-3xl font-semibold mb-2">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg">
          {project.description}
        </p>
        
        {project.url.startsWith('/') ? (
          <Link
            to={project.url}
            className="inline-flex items-center gap-2 text-white font-sans font-semibold text-sm border-b border-white/40 pb-0.5 w-fit hover:border-white transition-colors duration-200"
            aria-label={`View case study: ${project.title}`}
          >
            View Case Study
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        ) : (
          <a
            href={project.url}
            target={project.url !== '#' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-sans font-semibold text-sm border-b border-white/40 pb-0.5 w-fit hover:border-white transition-colors duration-200"
            aria-label={`View case study: ${project.title}`}
          >
            View Case Study
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

export default function CaseStudies() {
  const [labelRef, labelVisible] = useInView(0.2);

  return (
    <section id="work" className="section bg-bg" aria-labelledby="work-heading">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div ref={labelRef} className={`reveal ${labelVisible ? 'visible' : ''}`}>
            <p className="label mb-4 text-accent">Selected work</p>
            <h2 id="work-heading" className="font-serif text-primary">
              Case Studies
            </h2>
          </div>
          <p className="text-muted max-w-sm text-sm leading-relaxed md:text-right">
            End-to-end design across product, web, and mobile — from 0→1 launches to complex redesigns.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Hero card — spans 2 cols */}
          <ProjectCard project={projects[0]} large={true} />

          {/* Remaining 4 */}
          {projects.slice(1).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
