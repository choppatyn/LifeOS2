import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronIcon } from './ChevronIcon';
import { IconCircle } from './IconCircle';

interface Props {
  icon: string;
  title: string;
  subtitle?: string;
  path?: string;
  onClick?: () => void;
}

export const ListRow: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  path,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else if (path) navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 cursor-pointer transition-all rounded-2xl px-4 py-3 hover:border-[#c9a84c]"
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
      }}
    >
      <IconCircle>
        <span className="text-lg">{icon}</span>
      </IconCircle>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </div>
        {subtitle && (
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {subtitle}
          </div>
        )}
      </div>

      <ChevronIcon />
    </div>
  );
};
