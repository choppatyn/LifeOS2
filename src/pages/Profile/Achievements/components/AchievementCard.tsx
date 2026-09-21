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
      className="flex items-center gap-3 cursor-pointer transition-all rounded-2xl px-3 py-3 mb-2"
      style={{
        background: 'linear-gradient(145deg, #1a1515, #141010)',
        border: '1px solid #2a2323',
      }}
    >
      <IconCircle>
        <span className="text-lg">{category?.icon || '🏆'}</span>
      </IconCircle>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#e8e0d8] truncate">{item.title}</div>
        <div className="text-xs text-muted truncate">
          {category?.label}
          {year && ` • ${year}`}
        </div>
      </div>

      <ChevronIcon />
    </div>
  );
};
