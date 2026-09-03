import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Travels: React.FC = () => {
  const navigate = useNavigate();
  const [travels] = useState([
    { id: '1', country: 'ОАЭ', city: 'Дубай', days: 365, purpose: 'Жизнь' },
    { id: '2', country: 'Турция', city: 'Стамбул', days: 7, purpose: 'Отдых' },
    { id: '3', country: 'Египет', city: 'Шарм-Эль-Шейх', days: 10, purpose: 'Отдых' },
  ]);

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">🌍 Путешествия</h1>
        <span className="text-sm text-muted ml-auto">{travels.length} стран</span>
      </div>

      <div className="space-y-3">
        {travels.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#c9a84c]">{item.country}, {item.city}</div>
              <div className="text-xs text-muted">{item.days} дней • {item.purpose}</div>
            </div>
            <span className="text-2xl">✈️</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Travels;
