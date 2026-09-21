import React from 'react';

interface Props {
  onClick: () => void;
  ariaLabel?: string;
}

export const FloatingAddButton: React.FC<Props> = ({
  onClick,
  ariaLabel = 'Добавить',
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-transform hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
        color: '#0a0808',
        boxShadow: '0 8px 30px rgba(201,168,76,0.35)',
        zIndex: 40,
      }}
      aria-label={ariaLabel}
    >
      +
    </button>
  );
};
