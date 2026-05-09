import React from 'react';
import { useInView } from '../hooks/useInView';

const DownArrow = () => (
  <div className="flex flex-col items-center">
    <div className="w-px h-8 bg-gradient-to-b from-accent to-accent/20" />
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M6 8L0 0H12L6 8Z" fill="url(#arrowGrad)" />
      <defs>
        <linearGradient id="arrowGrad" x1="6" y1="0" x2="6" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const UpArrow = () => (
  <div className="flex flex-col items-center">
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M6 0L12 8H0L6 0Z" fill="url(#arrowGradUp)" />
      <defs>
        <linearGradient id="arrowGradUp" x1="6" y1="8" x2="6" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
    <div className="w-px h-8 bg-gradient-to-b from-accent/20 to-accent" />
  </div>
);

const NodeRect = ({ label, highlight, glow }) => (
  <div className={`
    relative px-4 py-3.5 rounded-2xl border text-center text-sm font-medium leading-snug w-full
    backdrop-blur-sm transition-all duration-300 group
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
  <div className="flex justify-center my-1 w-full">
    <div className="relative" style={{ width: '130px', height: '65px' }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 bg-accent/8"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      {/* Main diamond */}
      <div
        className="absolute inset-[3px] bg-accent/12 border border-accent/50"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <span className="text-[10px] md:text-[11px] text-center text-accent font-bold leading-tight">{label}</span>
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

export default function RetirewellUserFlow() {
  const [ref, visible] = useInView(0.04);

  const topSpine = [
    { label: 'Start', type: 'terminal' },
    { label: 'Onboarding Screens' },
    { label: 'Login/Sign up', type: 'diamond' },
    { label: 'Home Screen', highlight: true },
  ];

  const branches = [
    { title: 'Dashboard', nodes: ['Start with calculator', 'Fill out profile'] },
    { title: 'Calculator', nodes: ['Fill in the details', 'Calculate', 'Compare Scenarios'] },
    { title: 'Plans', nodes: ['Create Plans', 'Take the assessment'] },
    { title: 'Goal Setter', nodes: ['Goal Based', 'Contribution Based', 'Save Goal'] },
    { title: 'Risk Assessment', nodes: ['Fill in the details', 'Generate Plans'] },
    { title: 'Profile', nodes: ['Personal Details', 'Financial Information', 'Risk Assessment'] },
    { title: 'Settings', nodes: ['Privacy & Support', 'App Preferences', 'Tips & Insights'] },
  ];

  return (
    <div ref={ref} className="relative max-w-6xl mx-auto overflow-x-auto pb-8">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="min-w-[1100px] relative">

        {/* ── TOP SPINE ── */}
        <div className="flex flex-col items-center">
          {topSpine.map((node, i) => (
            <div key={i} className="flex flex-col items-center" style={{ ...slide(visible, i * 90), width: node.type === 'diamond' ? 'auto' : '210px' }}>
              {node.type === 'terminal' && <NodeTerminal label={node.label} />}
              {node.type === 'diamond' && <NodeDiamond label={node.label} />}
              {!node.type && <NodeRect label={node.label} highlight={node.highlight} />}
              {i < topSpine.length - 1 && <DownArrow />}
            </div>
          ))}
        </div>
        <DownArrow />

        {/* ── BRANCH CONNECTOR ── */}
        <div style={slide(visible, 400)}>
          <div className="relative h-10 mt-2">
            {/* Horizontal bar */}
            <div className="absolute top-0 bg-gradient-to-r from-transparent via-accent/35 to-transparent h-px" style={{ left: '7%', right: '7%' }} />
            {/* Vertical drops to each column */}
            {[7, 21.3, 35.6, 50, 64.3, 78.6, 93].map((pos, i) => (
              <div key={i} className="absolute w-px h-10 bg-accent/25" style={{ left: `${pos}%` }} />
            ))}
          </div>

          {/* ── 7 BRANCH COLUMNS ── */}
          <div className="grid grid-cols-7 gap-3">
            {branches.map((branch, bi) => (
              <div key={bi} className="flex flex-col items-center gap-0" style={slide(visible, 480 + bi * 75)}>
                <NodeDiamond label={branch.title} />
                {branch.nodes.map((node, ni) => (
                  <div key={ni} className="w-full flex flex-col items-center px-1" style={slide(visible, 550 + bi * 75 + ni * 50)}>
                    <DownArrow />
                    <NodeRect label={node} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
