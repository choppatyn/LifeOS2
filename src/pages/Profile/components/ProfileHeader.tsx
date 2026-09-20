import React from 'react';

interface ProfileHeaderProps {
  fullName: string;
  avatarUrl?: string;
  level?: number;
  energy?: number;
  health?: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName,
  avatarUrl,
  level = 1,
  energy = 86,
  health = 92,
}) => {
  const initial = fullName?.trim()?.charAt(0)?.toUpperCase() || '👤';

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="avatar avatar-lg overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#e8e0d8]">
            {fullName || 'Без имени'}
          </h1>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-muted">Уровень</span>
            <span className="level-badge">{level}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted">
        <span>⚡ {energy}%</span>
        <span>❤️ {health}%</span>
      </div>
    </div>
  );
};
