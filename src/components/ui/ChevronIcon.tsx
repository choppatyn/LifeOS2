import React from 'react';

interface Props {
  className?: string;
}

export const ChevronIcon: React.FC<Props> = ({ className = '' }) => (
  <span
    className={`text-2xl leading-none ${className}`}
    style={{ color: 'var(--color-arrow)' }}
  >
    ›
  </span>
);
