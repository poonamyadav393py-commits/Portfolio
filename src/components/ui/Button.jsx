import React from 'react';
// src/components/ui/Button.jsx
import PropTypes from 'prop-types';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';

/**
 * Reusable magnetic button with variant support.
 * @param {'filled'|'outline'|'ghost'} variant
 */
export function Button({ children, variant = 'filled', className = '', onClick, href, ...props }) {
  const magnetRef = useMagneticEffect(80, 20);

  const base = 'inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans font-medium text-sm tracking-wide transition-all duration-300 cursor-none';

  const variants = {
    filled: 'bg-accent text-bg hover:bg-opacity-90 hover:scale-105 shadow-lg shadow-accent/20',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-bg',
    ghost: 'border-2 border-transparent text-primary hover:bg-primary/10 hover:text-accent',
    resume: 'border-2 border-accent text-accent hover:bg-accent hover:text-bg shadow-[0_0_15px_rgba(179,136,255,0.2)] hover:shadow-[0_0_25px_rgba(179,136,255,0.4)] hover:scale-105',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <div ref={magnetRef} className="magnetic">
        <a href={href} className={cls} {...props}>{children}</a>
      </div>
    );
  }

  return (
    <div ref={magnetRef} className="magnetic">
      <button onClick={onClick} className={cls} {...props}>{children}</button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['filled', 'outline', 'ghost']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
};
