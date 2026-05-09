// src/components/Footer.jsx
import { Github, Linkedin, Globe, Mail } from 'lucide-react';
import React from 'react';

const socials = [
  { icon: <Mail className="w-4 h-4" />, href: 'mailto:poonamyadav393.py@gmail.com', label: 'Email Poonam Yadav' },
  { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com/in/poonamyadav24', label: 'Poonam Yadav on LinkedIn' },
  { icon: <Globe className="w-4 h-4" />, href: 'https://designwithpoonam.com', label: 'designwithpoonam.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-surface border-t border-white/5 py-12"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="container">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 pb-10 border-b border-white/10">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 cursor-none" aria-label="Poonam Yadav — Back to top">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="font-serif font-bold text-sm text-white">PY</span>
            </div>
            <span className="font-sans font-medium text-white/80 text-sm">Poonam Yadav</span>
          </a>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-8">
            {['Work', 'About', 'Process', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-sans text-sm text-white/40 hover:text-white transition-colors duration-200 cursor-none"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 cursor-none"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-sans text-xs text-white/30 text-center md:text-left">
            Designed & developed with ♥ by Poonam Yadav
          </p>
          <p className="font-sans text-xs text-white/20">
            © {year} Poonam Yadav. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
