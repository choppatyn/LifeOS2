import React from 'react';
import { Achievement, CATEGORIES } from '../hooks/useAchievements';
import { IconCircle } from '../../../../components/ui/IconCircle';
import { ChevronIcon } from '../../../../components/ui/ChevronIcon';

interface Props {
  item: Achievement;
  onClick?: () => void;
}

export const AchievementCard: React.FC<Props> = ({ item, onClick }) => {
  const category = CATEGORIES.find((c) => c.id === item.category);
  const year = item.date ? new Date(item.date).getFullYear() : '';

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer transition-all px-3 py-3 mb-2 
      hover:border-[#c9a84c]"
      style={{
        background: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-card-border)',
      }}
    >
      <IconCircle>
        <span className="text-lg">{category?.icon || '🏆'}</span>
      </IconCircle>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
          {item.title}
        </div>
        <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
          {category?.label}
          {year && ` • ${year}`}
        </div>
      </div>

      <ChevronIcon />
    </div>
  );
};
