import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { caseStudiesData } from '../data/caseStudiesData';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useInView } from '../hooks/useInView';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import UserFlowDiagram from '../components/UserFlowDiagram';
import RetirewellUserFlow from '../components/RetirewellUserFlow';
import EployrsUserFlow from '../components/EployrsUserFlow';
import TalenlioUserFlow from '../components/TalenlioUserFlow';

function SectionTitle({ children }) {
  const [ref, visible] = useInView(0.1);
  return (
    <h2 ref={ref} className={`font-serif text-3xl md:text-4xl text-primary mb-8 reveal ${visible ? 'visible' : ''}`}>
      {children}
    </h2>
  );
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-16 md:py-24 border-t border-white/5 ${className}`}>
      {children}
    </section>
  );
}

function AnimatedImage({ src, alt, onClick, wrapperClassName = '' }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`reveal rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer group ${visible ? 'visible' : ''} ${wrapperClassName}`}
    >
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
    </div>
  );
}

function AnimatedBlock({ children, delay = '0ms', className = '' }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: delay }}>
      {children}
    </div>
  );
}

function AnimatedBar({ percent, delay = '0ms' }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all ease-out"
        style={{
          width: visible ? `${percent}%` : '0%',
          transitionDuration: '1200ms',
          transitionDelay: delay,
        }}
      />
    </div>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const data = caseStudiesData[slug];
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalState, setModalState] = useState('closed'); // 'closed', 'opening', 'open', 'closing'

  const openModal = (src) => {
    setSelectedImage(src);
    setModalState('opening');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setModalState('open');
      });
    });
  };

  const closeModal = () => {
    setModalState('closing');
    setTimeout(() => {
      setModalState('closed');
      setSelectedImage(null);
    }, 300); // matches transition duration
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="bg-bg min-h-screen text-text pt-32 pb-24">
      <div className="container max-w-5xl">

        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-12 font-sans text-sm tracking-wide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Hero Header */}
        <header className="mb-20">
          <h1 className="font-serif text-5xl md:text-7xl text-primary mb-6 leading-tight">
            {data.title}
          </h1>
<div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
            <p className="text-xl md:text-2xl text-accent font-medium m-0">
              {data.subtitle}
            </p>
            {data.liveLink && (
              <a 
                href={data.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent/10 border border-accent/50 text-accent hover:bg-accent hover:text-bg transition-colors w-fit text-sm font-semibold shadow-[0_0_15px_rgba(179,136,255,0.15)] hover:shadow-[0_0_20px_rgba(179,136,255,0.4)]"
              >
                Visit Website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/10">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Role</p>
              <p className="font-medium text-primary">{data.role}</p>
            </div>
            {data.duration && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-2">Duration</p>
                <p className="font-medium text-primary">{data.duration}</p>
              </div>
            )}
            <div className="col-span-2 md:col-span-2">
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Process</p>
              <div className="flex flex-wrap gap-2">
                {data.designProcess.map((step) => (
                  <Badge key={step} label={step} className="bg-surface border-white/10" />
                ))}
              </div>
            </div>
          </div>

          {data.heroImage && (
            <div
              className="mt-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative cursor-pointer group"
              onClick={() => openModal(data.heroImage)}
            >
              <img
                src={data.heroImage}
                alt={`${data.title} Mockup`}
                className="w-full h-auto block group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          )}
        </header>

        {/* Overview & Problem */}
        <Section id="overview">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <SectionTitle>Overview</SectionTitle>
              <p className="text-lg leading-relaxed text-white/80">{data.overview}</p>
            </div>
            <div className="md:col-span-7 bg-surface/50 rounded-3xl p-8 md:p-12 border border-white/5">
              <h3 className="font-serif text-2xl text-accent mb-4">The Problem</h3>
              <p className="text-white/80 leading-relaxed mb-8">{data.problem}</p>

              <h3 className="font-serif text-2xl text-accent mb-4">Target Audience</h3>
              <p className="text-white/80 leading-relaxed">{data.targetAudience}</p>
            </div>
          </div>
        </Section>

        {/* Goals */}
        <Section id="goals">
          <SectionTitle>Project Goals</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            {data.goals.map((goal, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-surface rounded-2xl">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent font-serif shrink-0">
                  {i + 1}
                </span>
                <p className="text-white/90">{goal}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Research & Insights */}
        {data.research && (
          <Section id="research">
            <SectionTitle>Research & Insights</SectionTitle>
            <p className="text-lg text-white/70 mb-12 max-w-3xl leading-relaxed">
              {data.research.methodology}
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-2xl text-primary mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-accent rounded-full block"></span>
                  Key Insights
                </h3>
                <ul className="space-y-4">
                  {data.research.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <svg className="w-5 h-5 text-accent shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-primary mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-red-400 rounded-full block"></span>
                  Pain Points
                </h3>
                <ul className="space-y-4">
                  {data.research.painPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <svg className="w-5 h-5 text-red-400 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {data.research.image && (
              <div className="mt-16 flex justify-center">
                <AnimatedImage
                  src={data.research.image}
                  alt="Research Survey Insights"
                  onClick={() => openModal(data.research.image)}
                  wrapperClassName="max-w-5xl w-full"
                />
              </div>
            )}
          </Section>
        )}

        {/* Research Stats / Percentage Bars */}
        {data.researchStats && data.researchStats.length > 0 && (
          <Section id="research-stats">
            <SectionTitle>Research Findings</SectionTitle>
            <p className="text-lg text-white/70 mb-12 max-w-3xl leading-relaxed">
              User interviews and surveys revealed key pain points and behavioural patterns that shaped our design decisions.
            </p>
            <div className="space-y-8 mb-16">
              {data.researchStats.map((stat, i) => (
                <AnimatedBlock key={i} delay={`${i * 80}ms`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/80 text-sm md:text-base font-medium leading-snug max-w-[75%]">{stat.label}</span>
                    <span className="font-serif text-2xl md:text-3xl font-bold text-accent">
                      {stat.percent}%
                    </span>
                  </div>
                  <AnimatedBar percent={stat.percent} delay={`${i * 80 + 150}ms`} />
                </AnimatedBlock>
              ))}
            </div>

            {/* Survey Groups */}
            {data.surveyGroups && data.surveyGroups.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {data.surveyGroups.map((group, gi) => (
                  <AnimatedBlock key={gi} delay={`${gi * 120}ms`}>
                    <div className="bg-surface border border-white/5 rounded-3xl p-7 h-full hover:border-accent/20 transition-colors duration-300">
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <svg className="w-7 h-7 text-white/20 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        {group.tag && (
                          <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                            {group.tag}
                          </span>
                        )}
                      </div>
                      {/* Card Title */}
                      <h4 className="font-serif text-base md:text-lg text-accent font-semibold mb-6 leading-snug">
                        {group.title}
                      </h4>
                      {/* Bars */}
                      <div className="space-y-5">
                        {group.items.map((item, ii) => (
                          <div key={ii}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/75 text-sm font-medium">{item.label}</span>
                              <span className="text-white/90 text-sm font-bold tabular-nums">{item.percent}%</span>
                            </div>
                            <AnimatedBar percent={item.percent} delay={`${gi * 120 + ii * 80 + 200}ms`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedBlock>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* Competitive Analysis */}
        {data.competitiveAnalysis && (
          <Section id="competitive-analysis">
            <SectionTitle>Competitive Analysis</SectionTitle>
            <div className="bg-gradient-to-br from-surface to-bg border border-white/5 p-8 md:p-12 rounded-3xl">
              <p className="text-lg text-white/80 leading-relaxed">
                {data.competitiveAnalysis}
              </p>
              {data.competitiveAnalysisImage && (
                <div className="mt-10 flex justify-center">
                  <AnimatedImage
                    src={data.competitiveAnalysisImage}
                    alt="Competitive Analysis"
                    onClick={() => openModal(data.competitiveAnalysisImage)}
                    wrapperClassName="max-w-3xl w-full"
                  />
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Journey Map */}
        {data.journeyMap && (
          <Section id="journey">
            <SectionTitle>User Journey Map</SectionTitle>

            <div className="relative border-l-2 border-white/10 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0 space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
              {data.journeyMap.map((step, i) => (
                <div key={i} className="relative">
                  <div className="md:hidden absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-bg"></div>
                  <div className="hidden md:block w-full h-0.5 bg-white/10 absolute top-4 left-0"></div>
                  <div className="hidden md:block absolute left-0 top-2.5 w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(179,136,255,0.5)] z-10"></div>

                  <div className="md:pt-12">
                    <h4 className="font-serif text-xl text-primary mb-2">{step.step}</h4>
                    <p className="text-xs uppercase tracking-widest text-accent mb-4">{step.feelings}</p>
                    <p className="text-sm text-white/70 leading-relaxed bg-surface p-4 rounded-xl">
                      {step.painPoints}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {data.journeyMapImage && (
              <div className="mt-16 flex justify-center">
                <AnimatedImage
                  src={data.journeyMapImage}
                  alt="User Journey Map Visualization"
                  onClick={() => openModal(data.journeyMapImage)}
                  wrapperClassName="max-w-5xl w-full"
                />
              </div>
            )}


          </Section>
        )}

        {/* Personas */}
        {data.personas && data.personas.length > 0 && (
          <Section id="personas">
            <SectionTitle>User Personas</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8">
              {data.personas.map((persona, i) => (
                <div key={i} className="bg-surface border border-white/5 rounded-3xl p-8 hover:border-accent/30 transition-colors">
                  <div className="flex gap-6 items-center mb-6">
                    {persona.image && (
                      <div
                        className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-bg/50 cursor-pointer hover:border-accent/50 transition-colors"
                        onClick={() => openModal(persona.image)}
                      >
                        <img src={persona.image} alt={persona.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-serif text-2xl text-primary mb-1">{persona.name}</h3>
                      <p className="text-accent text-sm font-medium">{persona.occupation} • {persona.age}</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {persona.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted mb-3">Goals</h4>
                      <ul className="space-y-2">
                        {persona.goals.map((goal, j) => (
                          <li key={j} className="text-sm text-white/90 flex items-start gap-2">
                            <span className="text-accent mt-0.5">•</span> {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-muted mb-3">Frustrations</h4>
                      <ul className="space-y-2">
                        {persona.frustrations.map((frust, j) => (
                          <li key={j} className="text-sm text-white/90 flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span> {frust}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Empathy Map Images */}
        {data.empathyMapImages && (
          <Section id="empathy-map-images" className="overflow-hidden">
            <div className="flex justify-center mb-16">
              <div className="bg-white/5 border border-white/10 px-8 py-3 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-sm">
                <span className="font-serif text-xl text-primary">Empathy Map</span>
                <span className="text-accent text-xl">✦</span>
              </div>
            </div>
            <div className="space-y-12 max-w-5xl mx-auto">
              {data.empathyMapImages.map((src, i) => (
                <AnimatedImage
                  key={i}
                  src={src}
                  alt="Empathy Map"
                  onClick={() => openModal(src)}
                  wrapperClassName="w-full"
                />
              ))}
            </div>
          </Section>
        )}

        {/* Empathy Map */}
        {(data.empathyMap || data.empathyMaps) && (
          <Section id="empathy-map" className="overflow-hidden">
            <div className="flex justify-center mb-16">
              <div className="bg-white/5 border border-white/10 px-8 py-3 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-sm">
                <span className="font-serif text-xl text-primary">Empathy Map</span>
                <span className="text-accent text-xl">✦</span>
              </div>
            </div>

            <div className="space-y-32 md:space-y-48">
              {(Array.isArray(data.empathyMap || data.empathyMaps) 
                  ? (data.empathyMap || data.empathyMaps) 
                  : [data.empathyMap || data.empathyMaps]
              ).map((mapData, index) => (
                <div key={index} className="relative max-w-5xl mx-auto py-12 px-4">
                  {/* Dashed Grid Lines - Only visible on MD and up */}
                  <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-0 w-full h-px border-t border-dashed border-white/20 -translate-y-1/2"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full border-l border-dashed border-white/20 -translate-x-1/2"></div>
                  </div>

                  {/* Central Avatar */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[10px] border-bg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative flex items-center justify-center bg-surface ring-1 ring-white/10">
                      <img src={mapData.avatar} alt="Persona Avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Top Row: SAYS and THINKS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 relative z-10 mb-32 md:mb-48">
                    {/* SAYS */}
                    <AnimatedBlock delay="0ms" className="flex flex-col items-center md:items-end text-center md:text-right md:pr-16">
                      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[280px] md:w-[380px] h-[260px] md:h-[280px] flex flex-col justify-center mb-4 md:mb-6">
                        <ul className="space-y-4 text-left">
                          {mapData.says && mapData.says.map((item, i) => (
                            <li key={i} className="text-[#1a1a24] text-[13px] md:text-sm font-medium leading-relaxed flex gap-3">
                              <span className="text-gray-400 shrink-0 mt-0.5">•</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white/30 tracking-[0.2em] uppercase font-bold md:mr-10">Says</h3>
                    </AnimatedBlock>

                    {/* THINKS */}
                    <AnimatedBlock delay="150ms" className="flex flex-col items-center md:items-start text-center md:text-left md:pl-16">
                      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[280px] md:w-[380px] h-[260px] md:h-[280px] flex flex-col justify-center mb-4 md:mb-6">
                        <ul className="space-y-4 text-left">
                          {mapData.thinks && mapData.thinks.map((item, i) => (
                            <li key={i} className="text-[#1a1a24] text-[13px] md:text-sm font-medium leading-relaxed flex gap-3">
                              <span className="text-gray-400 shrink-0 mt-0.5">•</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white/30 tracking-[0.2em] uppercase font-bold md:ml-10">Thinks</h3>
                    </AnimatedBlock>
                  </div>

                  {/* Bottom Row: DOES and FEELS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 relative z-10">
                    {/* DOES */}
                    <AnimatedBlock delay="300ms" className="flex flex-col items-center md:items-end text-center md:text-right md:pr-16">
                      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[280px] md:w-[380px] h-[260px] md:h-[280px] flex flex-col justify-center mb-4 md:mb-6 order-last md:order-first md:mt-6">
                        <ul className="space-y-4 text-left">
                          {mapData.does && mapData.does.map((item, i) => (
                            <li key={i} className="text-[#1a1a24] text-[13px] md:text-sm font-medium leading-relaxed flex gap-3">
                              <span className="text-gray-400 shrink-0 mt-0.5">•</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white/30 tracking-[0.2em] uppercase font-bold md:mr-10 order-first md:order-last">Does</h3>
                    </AnimatedBlock>

                    {/* FEELS */}
                    <AnimatedBlock delay="450ms" className="flex flex-col items-center md:items-start text-center md:text-left md:pl-16">
                      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-[280px] md:w-[380px] h-[260px] md:h-[280px] flex flex-col justify-center mb-4 md:mb-6 order-last md:order-first md:mt-6">
                        <ul className="space-y-4 text-left">
                          {mapData.feels && mapData.feels.map((item, i) => (
                            <li key={i} className="text-[#1a1a24] text-[13px] md:text-sm font-medium leading-relaxed flex gap-3">
                              <span className="text-gray-400 shrink-0 mt-0.5">•</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white/30 tracking-[0.2em] uppercase font-bold md:ml-10 order-first md:order-last">Feels</h3>
                    </AnimatedBlock>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* User Flow Diagram */}
        {data.userFlow !== false && (
          <Section id="user-flow">
            <SectionTitle>User Flow</SectionTitle>
            <p className="text-lg text-white/70 mb-12 max-w-3xl leading-relaxed">
              {data.userFlowDescription || "End-to-end user journey mapped out — from first launch through onboarding, feature exploration, to checkout and delivery."}
            </p>
            {slug === 'retirewell' ? (
              <RetirewellUserFlow />
            ) : slug === 'eployrs' ? (
              <EployrsUserFlow />
            ) : slug === 'talenlio' ? (
              <TalenlioUserFlow />
            ) : data.userFlowImage ? (
              <div className="flex justify-center">
                <AnimatedImage
                  src={data.userFlowImage}
                  alt="User Flow"
                  onClick={() => openModal(data.userFlowImage)}
                  wrapperClassName="max-w-5xl w-full"
                />
              </div>
            ) : (
              <UserFlowDiagram />
            )}
          </Section>
        )}

        {/* Features & Solution */}
        {data.features && (
          <Section id="solution">
            <SectionTitle>Proposed Features</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.features.map((feature, i) => (
                <div key={i} className="bg-surface p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0"></div>
                  <p className="text-white/90 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Color Palette section below Features */}
        {data.colorPaletteImage && (
          <Section id="color-palette">
            <SectionTitle>Colour Palette</SectionTitle>
            <div className="flex justify-center">
              <AnimatedImage
                src={data.colorPaletteImage}
                alt="Colour Palette"
                onClick={() => openModal(data.colorPaletteImage)}
                wrapperClassName="max-w-4xl w-full"
              />
            </div>
          </Section>
        )}

        {/* Gallery / UI Screens — Grouped */}
        {(data.imageGroups || data.images) && (
          <Section id="gallery">
            <SectionTitle>UI Designs &amp; Screens</SectionTitle>

            {data.imageGroups ? (
              <div className="space-y-20">
                {data.imageGroups.map((group, gi) => (
                  <AnimatedBlock key={gi} delay={`${gi * 80}ms`}>
                    {/* Subsection header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-1.5 h-8 bg-accent rounded-full shrink-0" />
                      <div>
                        <h3 className="font-serif text-2xl text-primary">{group.title}</h3>
                        {group.description && (
                          <p className="text-sm text-white/50 mt-1">{group.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Images grid — smart layout */}
                    {group.images.length === 1 && (
                      <div className="flex justify-center">
                        <div className="max-w-3xl w-full">
                          <AnimatedImage src={group.images[0]} alt={`${data.title} — ${group.title}`} onClick={() => openModal(group.images[0])} />
                        </div>
                      </div>
                    )}

                    {group.images.length === 2 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {group.images.map((src, i) => (
                          <AnimatedImage key={i} src={src} alt={`${data.title} — ${group.title} ${i + 1}`} onClick={() => openModal(src)} />
                        ))}
                      </div>
                    )}

                    {group.images.length === 7 && (
                      <div className="space-y-6">
                        {/* Row 1: 3 images */}
                        <div className="grid grid-cols-3 gap-6">
                          {group.images.slice(0, 3).map((src, i) => (
                            <AnimatedImage key={i} src={src} alt={`${data.title} — ${group.title} ${i + 1}`} onClick={() => openModal(src)} />
                          ))}
                        </div>
                        {/* Row 2: 2 images centered */}
                        <div className="grid grid-cols-2 gap-6 max-w-[66%] mx-auto">
                          {group.images.slice(3, 5).map((src, i) => (
                            <AnimatedImage key={i} src={src} alt={`${data.title} — ${group.title} ${i + 4}`} onClick={() => openModal(src)} />
                          ))}
                        </div>
                        {/* Row 3: 2 images centered */}
                        <div className="grid grid-cols-2 gap-6 max-w-[66%] mx-auto">
                          {group.images.slice(5, 7).map((src, i) => (
                            <AnimatedImage key={i} src={src} alt={`${data.title} — ${group.title} ${i + 6}`} onClick={() => openModal(src)} />
                          ))}
                        </div>
                      </div>
                    )}

                    {group.images.length >= 3 && group.images.length !== 7 && (
                      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {group.images.map((src, i) => (
                          <div key={i} className="break-inside-avoid">
                            <AnimatedImage src={src} alt={`${data.title} — ${group.title} ${i + 1}`} onClick={() => openModal(src)} />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Divider between groups except last */}
                    {gi < data.imageGroups.length - 1 && (
                      <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                    )}
                  </AnimatedBlock>
                ))}
              </div>
            ) : (
              /* Fallback: flat images array */
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {data.images.map((src, i) => (
                  <div key={i} className="break-inside-avoid">
                    <AnimatedImage
                      src={src}
                      alt={`${data.title} screen ${i + 1}`}
                      onClick={() => openModal(src)}
                    />
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* Learnings */}
        {data.learnings && (
          <Section id="learnings" className="mb-20">
            <div className="bg-primary text-bg rounded-3xl p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

              <h2 className="font-serif text-3xl md:text-5xl mb-8 relative z-10 !text-bg">Key Learnings</h2>
              <p className="text-lg md:text-xl leading-relaxed relative z-10 max-w-4xl font-medium opacity-90 !text-bg">
                "{data.learnings}"
              </p>
            </div>

            {/* Thank You image */}
            {data.thankYouImage && (
              <AnimatedBlock delay="100ms" className="mt-12 flex justify-center">
                <div
                  className="rounded-3xl overflow-hidden border border-white/8 shadow-2xl cursor-pointer group max-w-4xl w-full"
                  onClick={() => openModal(data.thankYouImage)}
                >
                  <img
                    src={data.thankYouImage}
                    alt="Thank you for watching"
                    className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              </AnimatedBlock>
            )}
          </Section>
        )}

        {/* Next/Prev could go here, for now just a call to action */}
        <div className="flex justify-center py-12 border-t border-white/10">
          <Button href="/#work" variant="outline">
            View More Projects
          </Button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-zoom-out transition-opacity duration-300 ease-out ${modalState === 'open' ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-accent transition-colors bg-white/10 rounded-full p-3 z-10"
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            aria-label="Close image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className={`max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-all duration-300 ease-out ${modalState === 'open' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                }`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </main>
  );
}
