import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';

const Profile: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <div className="container">
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

      {/* Кнопка "Перейти в подразделы" — ведёт на страницу Subsections */}
      <Button
        variant="gold"
        fullWidth
        className="mt-4"
        onClick={() => navigate('/profile/subsections')}
      >
        Перейти в подразделы →
      </Button>
    </div>
  );
};

export default Profile;
