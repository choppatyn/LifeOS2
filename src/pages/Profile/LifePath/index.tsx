import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LifePath: React.FC = () => {
  const navigate = useNavigate();
  const [events] = useState([
    { id: '1', age: 18, event: 'Поступил в университет', stage: 'Образование' },
    { id: '2', age: 22, event: 'Первая работа', stage: 'Карьера' },
    { id: '3', age: 25, event: 'Создал бизнес', stage: 'Предпринимательство' },
    { id: '4', age: 28, event: 'Переезд в Дубай', stage: 'Жизнь' },
  ]);

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">📜 Жизненный путь</h1>
        <span className="text-sm text-muted ml-auto">{events.length} событий</span>
      </div>

      <div className="relative pl-4 border-l-2 border-[#c9a84c] space-y-6">
        {events.map((item) => (
          <div key={item.id} className="pl-4 relative">
            <div className="absolute -left-[9px] w-3 h-3 bg-[#c9a84c] rounded-full" />
            <div className="text-sm text-muted">{item.age} лет</div>
            <div className="font-medium text-[#c9a84c]">{item.event}</div>
            <div className="text-xs text-muted">{item.stage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifePath;
