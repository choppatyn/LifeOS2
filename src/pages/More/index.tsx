import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';

const More: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    { id: 'inventory', label: 'Инвентарь', icon: '🎒', path: '/inventory' },
    { id: 'goals', label: 'Цели', icon: '🎯', path: '/goals' },
    { id: 'assets', label: 'Активы', icon: '🏦', path: '/assets' },
    { id: 'balance', label: 'Баланс', icon: '💰', path: '/balance' },
    { id: 'journal', label: 'Дневник', icon: '📖', path: '/journal' },
    { id: 'media', label: 'Книги и фильмы', icon: '🎬', path: '/media' },
    { id: 'settings', label: 'Настройки', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className="container">
      <h1 className="text-xl font-bold">📋 Ещё</h1>
      <p className="text-muted text-sm mt-1">Все разделы приложения</p>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <Card
            key={item.id}
            className="flex items-center justify-between cursor-pointer hover:border-[#c9a84c] transition-all"
            onClick={() => navigate(item.path)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-muted">→</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default More;
