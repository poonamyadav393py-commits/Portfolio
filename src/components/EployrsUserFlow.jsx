import React from 'react';
import { useInView } from '../hooks/useInView';

/* ─── Shared primitives ─── */

const DownArrow = () => (
  <div className="flex flex-col items-center">
    <div className="w-px h-7 bg-gradient-to-b from-accent to-accent/20" />
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M6 8L0 0H12L6 8Z" fill="url(#arrowGradE)" />
      <defs>
        <linearGradient id="arrowGradE" x1="6" y1="0" x2="6" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const NodeRect = ({ label, highlight, glow }) => (
  <div className={`
    relative px-4 py-3 rounded-2xl border text-center text-xs font-medium leading-snug w-full
    backdrop-blur-sm transition-all duration-300
    ${highlight
      ? 'border-accent/60 bg-accent/10 text-accent'
      : 'border-white/15 bg-white/[0.04] text-white/80 hover:border-white/25 hover:bg-white/[0.07]'}
    ${glow ? 'shadow-[0_0_24px_rgba(179,136,255,0.25)]' : ''}
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

/* ─── Single Flow Column ─── */

function FlowColumn({ title, color, icon, nodes, visible }) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Column Header */}
      <div
        className={`
          mb-6 px-6 py-3 rounded-2xl border text-sm font-bold tracking-wide flex items-center gap-2
          ${color === 'recruiter'
            ? 'border-[#1A56FF]/50 bg-[#1A56FF]/10 text-[#1A56FF] shadow-[0_0_16px_rgba(26,86,255,0.15)]'
            : 'border-[#0ABF6F]/50 bg-[#0ABF6F]/10 text-[#0ABF6F] shadow-[0_0_16px_rgba(10,191,111,0.15)]'
          }
        `}
        style={slide(visible, 0)}
      >
        <span>{icon}</span>
        {title}
      </div>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className="flex flex-col items-center w-full"
          style={slide(visible, 80 + i * 90)}
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
          {i < nodes.length - 1 && <DownArrow />}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ─── */

export default function EployrsUserFlow() {
  const [ref, visible] = useInView(0.04);

  const recruiterNodes = [
    { label: 'Start', type: 'terminal' },
    { label: 'Landing Page' },
    { label: 'Sign Up / Log In', type: 'diamond' },
    { label: 'Create Profile' },
    { label: 'Post a Job / Fill Job Details', highlight: true },
    { label: 'Post It' },
    { label: 'Candidates Matching', highlight: true },
    { label: 'Review Applicants' },
    { label: 'Interview Scheduling', type: 'diamond' },
    { label: 'Shortlist' },
    { label: 'Check Application' },
    { label: 'Interview Confirmed', glow: true },
    { label: 'End', type: 'terminal', isEnd: true },
  ];

  const candidateNodes = [
    { label: 'Start', type: 'terminal' },
    { label: 'Landing Page' },
    { label: 'Sign Up / Log In', type: 'diamond' },
    { label: 'Create Profile' },
    { label: 'Fill Profile Details / Upload Resume', highlight: true },
    { label: 'Explore Jobs' },
    { label: 'Apply', highlight: true },
    { label: 'Interview' },
    { label: 'Interview Scheduling', type: 'diamond' },
    { label: 'Application Status' },
    { label: 'Application Result', type: 'diamond' },
    { label: 'Hired / Next Steps', glow: true },
    { label: 'End', type: 'terminal', isEnd: true },
  ];

  return (
    <div ref={ref} className="relative max-w-5xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[#1A56FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#0ABF6F]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Divider label */}
      <div className="flex items-center gap-4 mb-10" style={slide(visible, 0)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/10" />
        <span className="text-xs uppercase tracking-widest text-white/30 font-semibold">Dual User Flows</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/10" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <FlowColumn
          title="Recruiter / Employer"
          color="recruiter"
          icon="🏢"
          nodes={recruiterNodes}
          visible={visible}
        />
        {/* Vertical separator — only on desktop */}
        <div className="hidden md:block absolute left-1/2 top-16 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />
        <FlowColumn
          title="Job Seeker / Candidate"
          color="candidate"
          icon="👤"
          nodes={candidateNodes}
          visible={visible}
        />
      </div>
    </div>
  );
}
