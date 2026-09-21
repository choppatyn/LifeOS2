import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
      {/* Шапка */}
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button
          onClick={() => navigate('/profile')}
          className="text-2xl text-muted hover:text-[#c9a84c] transition-colors"
          aria-label="Назад"
        >
          ←
        </button>
        <h1 className="text-base font-semibold tracking-wide text-[#e8e0d8]">Подразделы</h1>
        <span className="text-xs text-muted ml-auto">{subsections.length} разделов</span>
      </div>

      {/* Список */}
      <div className="space-y-2">
        {subsections.map((sub) => (
          <div
            key={sub.id}
            onClick={() => navigate(sub.path)}
            className="flex items-center gap-3 cursor-pointer transition-all rounded-2xl px-3 py-3"
            style={{
              background: 'linear-gradient(145deg, #1a1515, #141010)',
              border: '1px solid #2a2323',
            }}
          >
            {/* Иконка в золотистой подложке */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,168,76,0.12)' }}
            >
              <span className="text-lg">{sub.icon}</span>
            </div>

            {/* Название + подсказка */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#e8e0d8] truncate">
                {sub.label}
              </div>
              <div className="text-xs text-muted truncate">Нажмите для перехода</div>
            </div>

            {/* Стрелочка */}
            <span className="text-[#4a3f36] text-2xl leading-none">›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subsections;
