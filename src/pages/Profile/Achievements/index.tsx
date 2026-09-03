import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Achievements: React.FC = () => {
  const navigate = useNavigate();

  // Данные как на макете
  const achievements = [
    { id: '1', title: 'Открыл свой бизнес', category: 'Карьера', year: '2023' },
    { id: '2', title: 'Первый в Дубай', category: 'Путешествия', year: '2022' },
    { id: '3', title: 'Запустил онлайн-школу', category: 'Образование', year: '2021' },
    { id: '4', title: 'Пробежал полумарафон', category: 'Спорт', year: '2020' },
    { id: '5', title: 'Прочитал 100 книг', category: 'Саморазвитие', year: '2020' },
    { id: '6', title: 'Финансовая подушка 10k$', category: 'Финансы', year: '2019' },
  ];

  const totalAchievements = 42;
  const thisYearAchievements = 7;

  return (
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
      {/* Шапка с кнопкой назад */}
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button
          onClick={() => navigate('/profile/subsections')}
          className="text-2xl text-muted hover:text-[#c9a84c] transition-colors"
        >
          ←
        </button>
        <span className="text-lg font-bold tracking-wider text-[#c9a84c]">🏆 ДОСТИЖЕНИЯ</span>
      </div>

      {/* Статистика достижений */}
      <div className="flex gap-6 mb-4">
        <div>
          <div className="text-2xl font-bold text-[#c9a84c]">{totalAchievements}</div>
          <div className="text-xs text-muted">Всего достижений</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-[#c9a84c]">{thisYearAchievements}</div>
          <div className="text-xs text-muted">В этом году</div>
        </div>
      </div>

      {/* Список достижений — как на макете: точка • название + год справа */}
      <div className="space-y-2">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-1.5 border-b border-[#1f1a1a] last:border-0"
          >
            <span className="text-sm text-[#e8e0d8]">• {item.title}</span>
            <span className="text-sm text-muted">{item.year}</span>
          </div>
        ))}
      </div>

      {/* Раздел "Карьера: опыт работы" — как на макете */}
      <div className="mt-6 pt-4 border-t border-[#2a2323]">
        <div className="text-xs text-muted uppercase tracking-wider mb-3">Карьера: опыт работы</div>
        <div className="flex gap-6">
          <div>
            <div className="text-2xl font-bold text-[#c9a84c]">6</div>
            <div className="text-xs text-muted">Компаний</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#c9a84c]">9</div>
            <div className="text-xs text-muted">Должность</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#c9a84c]">8 лет</div>
            <div className="text-xs text-muted">Опыт</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
