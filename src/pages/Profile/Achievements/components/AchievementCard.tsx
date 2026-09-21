import React from 'react';
import { Achievement, CATEGORIES } from '../hooks/useAchievements';

interface Props {
  item: Achievement;
  onClick?: () => void;
  onDelete?: () => void;
}

export const AchievementCard: React.FC<Props> = ({ item, onClick, onDelete }) => {
  const category = CATEGORIES.find((c) => c.id === item.category);
  const year = item.date ? new Date(item.date).getFullYear() : '';

  return (
    <div
      className="card flex items-center gap-3 cursor-pointer hover:border-[#c9a84c] transition-all"
      onClick={onClick}
    >
   <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)' }}>
  <span className="text-lg">{category?.icon || '🏆'}</span>
</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#e8e0d8] truncate">{item.title}</div>
        <div className="text-xs text-muted">
          {category?.label || 'Без категории'}
          {year && ` • ${year}`}
        </div>
      </div>
    </div>
  );
};
