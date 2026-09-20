import React from 'react';
import { Achievement, CATEGORIES } from '../hooks/useAchievements';

interface AchievementCardProps {
  item: Achievement;
  onClick?: () => void;
  onDelete?: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  item,
  onClick,
  onDelete,
}) => {
  const category = CATEGORIES.find((c) => c.id === item.category);
  const year = item.date ? new Date(item.date).getFullYear() : '';

  return (
    <div
      className="card flex items-center gap-3 cursor-pointer hover:border-[#c9a84c] transition-all"
      onClick={onClick}
    >
      <div className="text-2xl">{category?.icon || '🏆'}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#e8e0d8] truncate">
          {item.title}
        </div>
        <div className="text-xs text-muted">
          {category?.label || 'Без категории'}
          {year && ` • ${year}`}
        </div>
      </div>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-muted hover:text-[#ef4444] transition-colors text-lg px-1"
          aria-label="Удалить"
        >
          ✕
        </button>
      )}
    </div>
  );
};
