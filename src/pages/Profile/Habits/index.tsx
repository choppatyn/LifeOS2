import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Habits: React.FC = () => {
  const navigate = useNavigate();
  const [habits] = useState([
    { id: '1', name: 'Отказ от сахара', streak: 12, progress: 85 },
    { id: '2', name: 'Зарядка по утрам', streak: 8, progress: 70 },
    { id: '3', name: 'Чтение 30 минут', streak: 5, progress: 60 },
    { id: '4', name: 'Медитация', streak: 3, progress: 40 },
  ]);

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">🔄 Привычки</h1>
        <span className="text-sm text-muted ml-auto">{habits.length} привычек</span>
      </div>

      <div className="space-y-3">
        {habits.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-[#c9a84c]">{item.name}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#c9a84c]">🔥 {item.streak} дней</div>
                <div className="text-xs text-muted">{item.progress}%</div>
              </div>
            </div>
            <div className="progress-bar mt-2">
              <div className="progress-fill" style={{ width: `${item.progress}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Habits;
