import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 transition-all ${
        hoverable ? 'cursor-pointer hover:border-[#c9a84c]' : ''
      } ${className}`}
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
      }}
    >
      {children}
    </div>
  );
};
