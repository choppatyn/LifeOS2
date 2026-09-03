import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const infoItems = [
    { label: 'Возраст', value: '28 лет' },
    { label: 'Гражданство при рождении', value: 'Россия' },
    { label: 'Действующие гражданства', value: 'Россия →', link: '/profile/documents' },
    { label: 'Город', value: 'Дубай, ОАЭ' },
    { label: 'Деятельность', value: 'Предприниматель' },
    { label: 'Ключевая идея жизни', value: 'Свобода через создание ценности' },
    { label: 'Ключевая мечта на жизнь', value: 'Путешествовать и жить в разных странах' },
    { label: 'Семейное положение', value: 'Не женат →', link: '/profile/relationships' },
    { label: 'Статус', value: 'В процессе' },
  ];

  return (
    <div className="container">
      {/* Шапка */}
      <div className="flex items-center gap-3 mb-4">
        <div className="avatar avatar-lg">К</div>
        <div>
          <h1 className="text-xl font-bold">Кирилл Смирнов</h1>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>Уровень 28</span>
            <span>•</span>
            <span>Опыт: 12 450 / 18 000</span>
          </div>
        </div>
      </div>

      {/* Прогресс опыта */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted">Опыт</span>
          <span className="text-gold">70%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '70%' }} />
        </div>
      </div>

      {/* Информация */}
      <Card>
        <div className="space-y-1">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="info-row"
              onClick={() => item.link && navigate(item.link)}
            >
              <span className="info-label">{item.label}</span>
              <span className={`info-value ${item.link ? 'link' : ''}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Кнопка "Перейти в подразделы" */}
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
