import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface InfoItem {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

interface ProfileInfoListProps {
  sectionTitle?: string;
  items: InfoItem[];
}

export const ProfileInfoList: React.FC<ProfileInfoListProps> = ({
  sectionTitle,
  items,
}) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      {sectionTitle && (
        <div className="text-xs text-muted uppercase tracking-wider mb-2">
          {sectionTitle}
        </div>
      )}

      <div className="space-y-0">
        {items.map((item, idx) => {
          const clickable = Boolean(item.link);
          return (
            <div
              key={idx}
              onClick={() => clickable && navigate(item.link!)}
              className={`info-row ${clickable ? 'cursor-pointer' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base opacity-80">{item.icon}</span>
                <span className="info-label">{item.label}</span>
              </div>
              <span className={`info-value ${clickable ? 'link' : ''}`}>
                {item.value || '—'}
                {clickable && <span className="ml-1 text-[#c9a84c]">›</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
