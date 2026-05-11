import React from 'react';
import { useInView } from '../hooks/useInView';

/* ─── Shared primitives ─── */

const DownArrow = () => (
  <div className="flex flex-col items-center">
    <div className="w-px h-7 bg-gradient-to-b from-accent to-accent/20" />
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M6 8L0 0H12L6 8Z" fill="url(#arrowGradT)" />
      <defs>
        <linearGradient id="arrowGradT" x1="6" y1="0" x2="6" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const NodeRect = ({ label, highlight, glow, className = "" }) => (
  <div className={`
    relative px-4 py-3 rounded-2xl border text-center text-xs font-medium leading-snug w-full
    backdrop-blur-sm transition-all duration-300
    ${highlight
      ? 'border-accent/60 bg-accent/10 text-accent'
      : 'border-white/15 bg-white/[0.04] text-white/80 hover:border-white/25 hover:bg-white/[0.07]'}
    ${glow ? 'shadow-[0_0_24px_rgba(179,136,255,0.25)]' : ''}
    ${className}
  `}>
    {glow && (
      <div className="absolute inset-0 rounded-2xl bg-accent/5 animate-pulse pointer-events-none" />
    )}
    <span className="relative z-10">{label}</span>
  </div>
);

const NodeDiamond = ({ label }) => (
  <div className="flex justify-center my-1">
    <div className="relative" style={{ width: '148px', height: '74px' }}>
      <div
        className="absolute inset-0 bg-accent/8"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      <div
        className="absolute inset-[3px] bg-accent/12 border border-accent/50"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <span className="text-[11px] text-center text-accent font-bold leading-tight">{label}</span>
      </div>
    </div>
  </div>
);

const NodeTerminal = ({ label, isEnd }) => (
  <div className="flex justify-center">
    <div className={`
      px-6 py-2.5 rounded-full border text-sm font-bold tracking-wide
      ${isEnd
        ? 'border-accent bg-accent text-bg shadow-[0_0_24px_rgba(179,136,255,0.45)]'
        : 'border-accent/60 bg-accent/10 text-accent shadow-[0_0_14px_rgba(179,136,255,0.15)]'
      }
    `}>
      {label}
    </div>
  </div>
);

const slide = (visible, delay) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.96)',
  transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
});

export default function TalenlioUserFlow() {
  const [ref, visible] = useInView(0.04);

  const mainNodes = [
    { label: 'Start', type: 'terminal' },
    { label: 'Career Roadmap Dashboard' },
    { label: 'Explore career roadmap' },
    { label: 'Select a career', type: 'diamond' },
    { label: 'UI/UX Design', highlight: true },
    { label: 'View Career roadmap' },
    { label: 'Stage 1' },
    { label: 'Stage 2' },
    { label: 'Stage 3' },
    { label: 'Stage 4' },
    { label: 'Take Assessment', type: 'diamond' },
    { label: 'Explore recommendations' },
  ];

  return (
    <div ref={ref} className="relative max-w-5xl mx-auto overflow-x-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="min-w-[600px] relative flex flex-col items-center pb-20">
        
        {/* Main flow */}
        {mainNodes.map((node, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-[220px]"
            style={slide(visible, i * 90)}
          >
            {node.type === 'terminal' && <NodeTerminal label={node.label} isEnd={node.isEnd} />}
            {node.type === 'diamond' && <NodeDiamond label={node.label} />}
            {!node.type && (
              <NodeRect
                label={node.label}
                highlight={node.highlight}
                glow={node.glow}
              />
            )}
            {i < mainNodes.length - 1 && <DownArrow />}
          </div>
        ))}

        <div style={slide(visible, mainNodes.length * 90)}>
          <DownArrow />
        </div>

        {/* Split Section */}
        <div className="relative w-[340px] flex justify-between mt-2" style={slide(visible, mainNodes.length * 90 + 50)}>
          
          {/* Horizontal top line connecting branches */}
          <div className="absolute top-0 left-[20%] right-[20%] h-px bg-accent/40" />
          
          {/* Left Branch */}
          <div className="flex flex-col items-center w-[140px] pt-[15px] relative">
            <div className="absolute top-0 w-px h-[15px] bg-accent/40" />
            <NodeRect label="Continue learning" highlight />
            {/* The line pointing back up is complex to draw perfectly responsive, 
                so we add a decorative left side loop indicator */}
            <svg className="absolute top-1/2 -left-[60px] -translate-y-1/2 w-[50px] h-[400px] opacity-40 text-accent" fill="none" preserveAspectRatio="none">
              <path d="M50 20 L10 20 L10 380 L50 380" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <polygon points="50,15 50,25 55,20" fill="currentColor" />
            </svg>
            <div className="absolute top-1/2 -left-[80px] -translate-y-1/2 text-[10px] text-accent/60 -rotate-90 origin-center whitespace-nowrap">
              Back to View Roadmap
            </div>
          </div>

          {/* Right Branch */}
          <div className="flex flex-col items-center w-[140px] pt-[15px] relative">
            <div className="absolute top-0 w-px h-[15px] bg-accent/40" />
            <NodeRect label="Save for later" />
            <DownArrow />
            <NodeTerminal label="The End" isEnd />
          </div>

        </div>

      </div>
    </div>
  );
}
