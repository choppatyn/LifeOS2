import React from 'react';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  src?: string | null;
  name?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'md', src, name }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  const initial = name?.charAt(0)?.toUpperCase() || '👤';

  if (src) {
    return <img src={src} alt={name} className={`rounded-full ${sizes[size]} object-cover`} />;
  }

  return (
    <div className={`rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8d08a] flex items-center justify-center text-black font-bold ${sizes[size]}`}>
      {initial}
    </div>
  );
};
