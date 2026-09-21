import React from 'react';

interface Props {
  className?: string;
}

export const ChevronIcon: React.FC<Props> = ({ className = '' }) => (
  <span className={`text-[#4a3f36] text-2xl leading-none ${className}`}>›</span>
);
