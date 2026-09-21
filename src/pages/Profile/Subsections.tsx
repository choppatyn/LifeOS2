import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListRow } from '../../components/ui/ListRow';

const Subsections: React.FC = () => {
  const navigate = useNavigate();

  const subsections = [
    { id: 'achievements', label: 'Достижения', icon: '🏆', path: '/profile/achievements' },
    { id: 'relationships', label: 'Личные отношения', icon: '💕', path: '/profile/relationships' },
    { id: 'habits', label: 'Привычки', icon: '🔄', path: '/profile/habits' },
    { id: 'lifepath', label: 'Жизненный путь', icon: '📜', path: '/profile/lifepath' },
    { id: 'travels', label: 'Путешествия', icon: '🌍', path: '/profile/travels' },
    { id: 'career', label: 'Карьера', icon: '💼', path: '/profile/career' },
    { id: 'documents', label: 'Личные документы', icon: '📄', path: '/profile/documents' },
    { id: 'identity', label: 'Идентичность', icon: '🧘', path: '/profile/identity' },
  ];

  return (
    <div className="container min-h-screen pb-20">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button
          onClick={() => navigate('/profile')}
          className="text-2xl text-muted hover:text-[#c9a84c]"
        >
          ←
        </button>
        <h1 className="text-base font-semibold">Подразделы</h1>
        <span className="text-xs text-muted ml-auto">{subsections.length} разделов</span>
      </div>

      <div className="space-y-2">
        {subsections.map((s) => (
          <ListRow
            key={s.id}
            icon={s.icon}
            title={s.label}
            subtitle="Нажмите для перехода"
            path={s.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Subsections;
