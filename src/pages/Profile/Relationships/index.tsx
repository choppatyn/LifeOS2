import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Relationships: React.FC = () => {
  const navigate = useNavigate();
  const [relationships] = useState([
    { id: '1', name: 'Анна Смирнова', type: 'Мама' },
    { id: '2', name: 'Игорь Смирнов', type: 'Отец' },
    { id: '3', name: 'Алексей В.', type: 'Лучший друг' },
    { id: '4', name: 'Мария К.', type: 'Партнёр' },
    { id: '5', name: 'Дмитрий С.', type: 'Коллега' },
  ]);

  return (
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">💕 Личные отношения</h1>
        <span className="text-sm text-muted ml-auto">{relationships.length} человек</span>
      </div>

      <div className="space-y-3">
        {relationships.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#c9a84c]">{item.name}</div>
              <div className="text-xs text-muted">{item.type}</div>
            </div>
            <span className="text-2xl">💕</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Relationships;
