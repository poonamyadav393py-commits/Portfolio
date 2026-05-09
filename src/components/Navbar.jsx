import React from 'react';
// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { useMagneticEffect } from '../hooks/useMagneticEffect';

/** Logo "PY" monogram */
function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-3 group cursor-none" aria-label="Poonam Yadav — Home">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
        <span className="font-serif font-bold text-sm text-bg">PY</span>
      </div>
      <span className="font-sans font-semibold text-sm text-primary hidden sm:block tracking-wide">
        Poonam Yadav
      </span>
    </a>
  );
}

/** Available badge with pulsing green dot */
function AvailableBadge() {
  return (
    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-50">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" aria-hidden="true" />
      <span className="text-xs font-sans font-medium text-green-700 tracking-wide">Available for projects</span>
    </div>
  );
}

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-surface/90 backdrop-blur-xl shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-medium tracking-wide transition-colors duration-200 relative group cursor-none ${
                  scrolled ? 'text-text hover:text-accent' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <AvailableBadge />

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-text' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-4 h-0.5 transition-all duration-300 ${scrolled ? 'bg-text' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-text' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-5xl text-primary hover:text-accent transition-colors duration-200 cursor-none"
              style={{ transitionDelay: menuOpen ? `${i * 80}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full border border-green-400/40 bg-green-500/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
            <span className="text-xs text-green-300 tracking-wide font-sans">Available for projects</span>
          </div>
        </nav>
      </div>
    </>
  );
}
