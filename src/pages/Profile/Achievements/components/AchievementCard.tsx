import React from 'react';
import { Achievement, CATEGORIES } from '../hooks/useAchievements';

interface Props {
  item: Achievement;
  onClick?: () => void;
  onDelete?: () => void;
}

export const AchievementCard: React.FC<Props> = ({ item, onClick }) => {
  const category = CATEGORIES.find((c) => c.id === item.category);
  const year = item.date ? new Date(item.date).getFullYear() : '';

  return (
    <div
      className="flex items-center gap-3 cursor-pointer transition-all rounded-2xl px-3 py-3 mb-2"
      style={{
        background: 'linear-gradient(145deg, #1a1515, #141010)',
        border: '1px solid #2a2323',
      }}
      onClick={onClick}
    >
      {/* Круглая иконка категории */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(201,168,76,0.12)' }}
      >
        <span className="text-lg">{category?.icon || '🏆'}</span>
      </div>

      {/* Название и категория + год */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#e8e0d8] truncate">
          {item.title}
        </div>
        <div className="text-xs text-muted truncate">
          {category?.label || 'Без категории'}
          {year && ` • ${year}`}
        </div>
      </div>

      {/* Стрелочка вправо */}
      <span className="text-[#4a3f36] text-2xl leading-none">›</span>
    </div>
  );
};
