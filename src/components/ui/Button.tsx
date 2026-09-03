import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  className = '',
  onClick,
}) => {
  const variants = {
    gold: 'btn-gold',
    outline: 'btn-outline-gold',
    ghost: 'bg-transparent text-[#c9a84c] hover:bg-[#1a1515] transition-colors',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
