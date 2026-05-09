import React from 'react';
// src/components/ui/Badge.jsx
import PropTypes from 'prop-types';

/**
 * Small tag badge for project categories.
 */
export function Badge({ label, className = '' }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-sans font-semibold tracking-widest uppercase rounded-full bg-white/10 text-white/80 backdrop-blur-sm border border-white/20 ${className}`}
    >
      {label}
    </span>
  );
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};
