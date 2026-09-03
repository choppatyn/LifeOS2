import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { ProgressBar } from '../../../components/ui/ProgressBar';

const Habits: React.FC = () => {
  const navigate = useNavigate();
  const [habits] = useState([
    { id: '1', name: 'Отказ от сахара', type: 'Питание', streak: 12, progress: 85 },
    { id: '2', name: 'Зарядка', type: 'Спорт', streak: 8, progress: 70 },
    { id: '3', name: 'Чтение 30 мин', type: 'Саморазвитие', streak: 5, progress: 60 },
    { id: '4', name: 'Медитация', type: 'Ментальное', streak: 3, progress: 40 },
  ]);

  return (
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile')} className="text-2xl text-muted hover:text-[#c9a84c]">
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
                <div className="text-xs text-muted">{item.type}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#c9a84c]">🔥 {item.streak} дней</div>
              </div>
            </div>
            <ProgressBar value={item.progress} className="mt-2" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Habits;
