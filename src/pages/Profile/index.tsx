import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [showSubsections, setShowSubsections] = useState(false);

  // Пункты с переходом в подразделы
  const infoItems = [
    { label: 'Возраст', value: '28 лет', path: null },
    { label: 'Гражданство', value: 'Россия', path: null },
    { label: 'Действующие гражданства', value: 'Россия →', path: '/profile/documents' },
    { label: 'Город', value: 'Дубай, ОАЭ', path: null },
    { label: 'Деятельность', value: 'Предприниматель', path: null },
    { label: 'Идея жизни', value: 'Свобода через создание ценности', path: null },
    { label: 'Мечта', value: 'Путешествовать и жить в разных странах', path: null },
    { label: 'Семейное положение', value: 'Не женат →', path: '/profile/relationships' },
    { label: 'Статус', value: 'В процессе', path: null },
  ];

  // Подразделы
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="lg" name="Кирилл Смирнов" />
          <div>
            <h1 className="text-xl font-bold">Кирилл Смирнов</h1>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span>Уровень 28</span>
              <span>•</span>
              <span>Опыт: 12 450 / 18 000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Прогресс опыта */}
      <ProgressBar value={70} label="Опыт" showValue className="mt-2" />

      {/* Информация (как на макете — слева label, справа value) */}
      <Card className="mt-4">
        <div className="space-y-2 text-sm">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-1 border-b border-[#2a2323] last:border-0 ${
                item.path ? 'cursor-pointer hover:text-[#c9a84c] transition-colors' : ''
              }`}
              onClick={() => item.path && navigate(item.path)}
            >
              <span className="text-muted">{item.label}</span>
              <span className={`font-medium ${item.path ? 'text-[#c9a84c]' : 'text-[#e8e0d8]'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Кнопка "Перейти в подразделы" — раскрывает подразделы внутри страницы */}
      <Button
        variant="gold"
        fullWidth
        className="mt-4"
        onClick={() => setShowSubsections(!showSubsections)}
      >
        {showSubsections ? 'Скрыть подразделы ↑' : 'Перейти в подразделы →'}
      </Button>

      {/* Подразделы (показываются только по кнопке) */}
      {showSubsections && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {subsections.map((sub) => (
            <button
              key={sub.id}
              onClick={() => navigate(sub.path)}
              className="bg-[#1a1515] border border-[#2a2323] rounded-xl p-3 text-center hover:border-[#c9a84c] transition-all"
            >
              <div className="text-2xl">{sub.icon}</div>
              <div className="text-xs text-muted mt-1">{sub.label}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
