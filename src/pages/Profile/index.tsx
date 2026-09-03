import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';

const Profile: React.FC = () => {
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
    <div className="container">
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

      <ProgressBar value={70} label="Опыт" showValue className="mt-2" />

      <Card className="mt-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-muted">Возраст</span><br />28 лет</div>
          <div><span className="text-muted">Гражданство при рождении</span><br />Россия</div>
          <div><span className="text-muted">Действующие Гражданства</span><br />Россия</div>
          <div><span className="text-muted">Город</span><br />Дубай, ОАЭ</div>
          <div><span className="text-muted">Деятельность</span><br />Предприниматель</div>
          <div className="col-span-2"><span className="text-muted">Идея жизни</span><br />Свобода через создание ценности</div>
          <div className="col-span-2"><span className="text-muted">Мечта</span><br />Путешествовать и жить в разных странах</div>
          <div><span className="text-muted">Семейное положение</span><br />Не женат</div>
          <div><span className="text-muted">Статус</span><br />В процессе</div>
        </div>
      </Card>

      <Button variant="gold" fullWidth className="mt-4">
        → Перейти в подразделы 
      </Button>

      <div className="grid grid-cols-2 gap-2 mt-2">
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
    </div>
  );
};

export default Profile;
