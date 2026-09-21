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
      className="flex items-center gap-3 cursor-pointer transition-all rounded-2xl px-3 py-3"
      style={{
        background: 'linear-gradient(145deg, #1a1515, #141010)',
        border: '1px solid #2a2323',
      }}
    >
      <IconCircle>
        <span className="text-lg">{icon}</span>
      </IconCircle>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#e8e0d8] truncate">{title}</div>
        {subtitle && <div className="text-xs text-muted truncate">{subtitle}</div>}
      </div>

      <ChevronIcon />
    </div>
  );
};
