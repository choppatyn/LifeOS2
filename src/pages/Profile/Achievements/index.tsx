import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Achievements: React.FC = () => {
  const navigate = useNavigate();
  const [achievements] = useState([
    { id: '1', title: 'Открыл свой бизнес', category: 'Карьера', date: '2023' },
    { id: '2', title: 'Первый в Дубай', category: 'Путешествия', date: '2022' },
    { id: '3', title: 'Запустил онлайн-школу', category: 'Образование', date: '2021' },
    { id: '4', title: 'Пробежал полумарафон', category: 'Спорт', date: '2020' },
    { id: '5', title: 'Прочитал 100 книг', category: 'Саморазвитие', date: '2020' },
    { id: '6', title: 'Финансовая подушка 10k$', category: 'Финансы', date: '2019' },
  ]);

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">🏆 Достижения</h1>
        <span className="text-sm text-muted ml-auto">{achievements.length} всего</span>
      </div>

      <div className="space-y-3">
        {achievements.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#c9a84c]">{item.title}</div>
              <div className="text-xs text-muted">{item.category} • {item.date}</div>
            </div>
            <span className="text-2xl">🏆</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
