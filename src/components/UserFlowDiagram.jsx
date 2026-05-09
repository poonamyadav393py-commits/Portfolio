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

const HLine = () => (
  <div className="w-4 h-px bg-white/25" />
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
  <div className="flex justify-center my-1">
    <div className="relative" style={{ width: '148px', height: '74px' }}>
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
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <span className="text-[11px] md:text-xs text-center text-accent font-bold leading-tight">{label}</span>
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

const BranchNode = ({ label }) => (
  <div className="w-full px-1.5 py-2 rounded-lg border border-white/8 bg-white/[0.02] text-white/55 text-[11px] text-center leading-snug hover:border-accent/20 hover:text-white/75 transition-all duration-200">
    {label}
  </div>
);

const slide = (visible, delay) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.96)',
  transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
});

export default function UserFlowDiagram() {
  const [ref, visible] = useInView(0.04);

  const topSpine = [
    { label: 'Start', type: 'terminal' },
    { label: 'Splash Screen' },
    { label: 'Onboarding Screen' },
    { label: 'Login / Sign up', type: 'diamond' },
    { label: 'Personalisation Screen' },
    { label: 'Home Screen', highlight: true },
  ];

  const branches = [
    { title: 'Search', nodes: ['Search Meals', 'Product List', 'Product Details', 'Customize', 'Add to Cart', 'Buy Now'] },
    { title: 'Categories', nodes: ['Product List', 'Search Meals', 'Product Details', 'Customize', 'Add to Cart', 'Buy Now'] },
    { title: 'Weekly Plan', highlight: true, nodes: ['Select Date', 'Select Time', 'Select Meals', 'Product Details', 'Customize', 'Add to Weekly Plan'] },
    { title: 'Profile', nodes: ['My Information', 'Health Preferences', 'Meal & Delivery Settings', 'Payment & Subscription', 'Signout', 'Delete Account'] },
    { title: 'Settings', nodes: ['App Settings', 'Notification Settings', 'Tips & Insights'] },
  ];

  return (
    <div ref={ref} className="relative max-w-5xl mx-auto overflow-x-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="min-w-[680px] relative">

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
        <div style={slide(visible, 560)}>
          <div className="relative h-10 mt-2">
            {/* Horizontal bar */}
            <div className="absolute top-0 bg-gradient-to-r from-transparent via-accent/35 to-transparent h-px" style={{ left: '9%', right: '9%' }} />
            {/* Vertical drops to each column */}
            {[10, 29, 48, 67, 86].map((pos, i) => (
              <div key={i} className="absolute w-px h-10 bg-accent/25" style={{ left: `${pos}%` }} />
            ))}
          </div>

          {/* ── 5 BRANCH COLUMNS ── */}
          <div className="grid grid-cols-5 gap-2">
            {branches.map((branch, bi) => (
              <div key={bi} className="flex flex-col items-center gap-0" style={slide(visible, 640 + bi * 75)}>
                <div className={`w-full px-2 py-3 rounded-xl border text-center text-xs font-bold
                  ${branch.highlight
                    ? 'border-accent/55 bg-accent/12 text-accent shadow-[0_0_12px_rgba(179,136,255,0.12)]'
                    : 'border-white/18 bg-white/6 text-white'
                  }`}>
                  {branch.title}
                </div>
                {branch.nodes.map((node, ni) => (
                  <div key={ni} className="w-full flex flex-col items-center" style={slide(visible, 700 + bi * 75 + ni * 50)}>
                    <DownArrow />
                    <BranchNode label={node} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM SPINE ── */}
        <div className="flex flex-col items-center mt-3">

          {/* Schedule */}
          <div className="flex flex-col items-center w-56" style={slide(visible, 1200)}>
            <DownArrow />
            <NodeRect label="Schedule" />
          </div>

          {/* Decision diamond with "No" label */}
          <div className="flex flex-col items-center" style={slide(visible, 1320)}>
            <DownArrow />
            <div className="relative flex items-center justify-center">
              <NodeDiamond label="Do you want to continue?" />
              {/* No → Home branch */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center gap-1.5 pl-2 whitespace-nowrap">
                <HLine />
                <span className="text-[9px] text-white/40 italic">No → Home Screen</span>
              </div>
            </div>
            <div className="text-[9px] text-accent/55 mt-0.5">↓ Yes</div>
          </div>

          {/* Price Details */}
          <div className="flex flex-col items-center w-56" style={slide(visible, 1440)}>
            <DownArrow />
            <NodeRect label="Price Details" />
          </div>

          {/* Delivery Details */}
          <div className="flex flex-col items-center w-56" style={slide(visible, 1540)}>
            <DownArrow />
            <NodeRect label="Delivery Details" />
          </div>

          {/* Select Payment Method with right-side branches */}
          <div className="flex flex-col items-center" style={slide(visible, 1640)}>
            <DownArrow />
            <div className="flex items-center gap-0">
              <div className="w-56">
                <NodeRect label="Select Payment Method" />
              </div>
              {/* Right connector + payment options */}
              <div className="flex items-center ml-2">
                {/* Horizontal stem from main node */}
                <div className="w-6 h-px bg-gradient-to-r from-accent/50 to-accent/20" />
                {/* Vertical bar with branches */}
                <div className="relative flex flex-col gap-3 border-l-2 border-accent/25 pl-3">
                  {['COD', 'Credit/Debit Card', 'UPI'].map((pm, i) => (
                    <div key={i} className="flex items-center gap-2" style={slide(visible, 1680 + i * 60)}>
                      {/* Arrow indicator */}
                      <div className="flex items-center gap-0.5">
                        <div className="w-3 h-px bg-accent/40" />
                        <svg width="6" height="5" viewBox="0 0 6 5">
                          <path d="M6 2.5L0 0V5L6 2.5Z" fill="rgba(179,136,255,0.5)" />
                        </svg>
                      </div>
                      {/* Highlighted option node */}
                      <div className="px-3 py-2 rounded-xl border border-accent/40 bg-accent/8 text-accent text-xs font-semibold whitespace-nowrap shadow-[0_0_10px_rgba(179,136,255,0.1)] hover:border-accent/60 hover:bg-accent/12 transition-all duration-200">
                        {pm}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Successful */}
          <div className="flex flex-col items-center w-56" style={slide(visible, 1760)}>
            <DownArrow />
            <NodeRect label="Payment Successful" highlight glow />
          </div>

          {/* Continue Shopping / Delivery Status fork */}
          <div className="flex flex-col items-center" style={slide(visible, 1860)}>
            <DownArrow />
            <div className="flex items-end gap-0">
              {/* Left branch */}
              <div className="flex flex-col items-center gap-0">
                <div className="flex items-center gap-0">
                  <div className="w-10 h-px bg-white/20" />
                  <div className="w-px h-4 bg-white/20" />
                </div>
                <div className="px-3 py-1.5 rounded-xl border border-white/12 bg-white/[0.04] text-white/60 text-[9px] text-center -mt-px">
                  Continue Shopping
                </div>
              </div>
              {/* Center connector */}
              <div className="mx-2 flex flex-col items-center">
                <div className="w-px h-8 bg-white/15" />
              </div>
              {/* Right branch */}
              <div className="flex flex-col items-center gap-0">
                <div className="flex items-center gap-0">
                  <div className="w-px h-4 bg-white/20" />
                  <div className="w-10 h-px bg-white/20" />
                </div>
                <div className="px-3 py-1.5 rounded-xl border border-white/12 bg-white/[0.04] text-white/60 text-[9px] text-center -mt-px">
                  Delivery Status
                </div>
              </div>
            </div>
            <DownArrow />
            <NodeTerminal label="The End" isEnd />
          </div>

        </div>
      </div>
    </div>
  );
}
