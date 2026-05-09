import React from 'react';
// src/components/MarqueeStrip.jsx
/**
 * Infinite scrolling marquee strip between sections.
 * Announces Poonam's skills/services.
 */
const items = [
  'Product Design', '✦', 'UX Strategy', '✦', 'Design Systems',
  '✦', 'Figma', '✦', 'User Research', '✦', 'Prototyping',
  '✦', 'Visual Design', '✦', 'UI/UX', '✦', 'Information Architecture',
  '✦', 'Product Design', '✦', 'UX Strategy', '✦', 'Design Systems',
  '✦', 'Figma', '✦', 'User Research', '✦', 'Prototyping',
  '✦', 'Visual Design', '✦', 'UI/UX', '✦', 'Information Architecture',
];

export default function MarqueeStrip({ inverted = false }) {
  return (
    <div
      className={`overflow-hidden py-5 ${inverted ? 'bg-primary' : 'bg-accent'}`}
      aria-hidden="true"
    >
      <div className="animate-marquee flex gap-10 whitespace-nowrap will-change-transform">
        {items.map((item, i) => (
          <span
            key={i}
            className={`font-sans text-sm font-semibold tracking-widest uppercase ${
              inverted ? 'text-bg/60' : 'text-bg/80'
            } ${item === '✦' ? 'text-bg/40' : ''}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
