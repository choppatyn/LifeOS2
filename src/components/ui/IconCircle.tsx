import React from 'react';

interface Props {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'w-9 h-9', md: 'w-11 h-11', lg: 'w-14 h-14' };

export const IconCircle: React.FC<Props> = ({ children, size = 'md' }) => (
  <div
    className={`${sizes[size]} rounded-full flex items-center justify-center flex-shrink-0`}
    style={{ background: 'rgba(201,168,76,0.12)' }}
  >
    {children}
  </div>
);
