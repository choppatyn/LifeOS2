import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

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
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8]">
      {/* Шапка с кнопкой назад */}
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button
          onClick={() => navigate('/profile')}
          className="text-2xl text-muted hover:text-[#c9a84c] transition-colors"
        >
          ←
        </button>
        <h1 className="text-xl font-bold">Подразделы</h1>
        <span className="text-sm text-muted ml-auto">{subsections.length} разделов</span>
      </div>

      {/* Список подразделов */}
      <div className="space-y-3 pb-20">
        {subsections.map((sub) => (
          <Card
            key={sub.id}
            className="flex items-center justify-between cursor-pointer hover:border-[#c9a84c] transition-all"
            onClick={() => navigate(sub.path)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sub.icon}</span>
              <div>
                <div className="font-medium">{sub.label}</div>
                <div className="text-xs text-muted">Нажмите для перехода</div>
              </div>
            </div>
            <span className="text-muted text-xl">→</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subsections;
