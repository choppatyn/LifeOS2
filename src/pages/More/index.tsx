import React from 'react';
import { ListRow } from '../../components/ui/ListRow';

const More: React.FC = () => {
  const items = [
    { id: 'inventory', label: 'Инвентарь', icon: '🎒', path: '/inventory' },
    { id: 'goals', label: 'Цели', icon: '🎯', path: '/goals' },
    { id: 'assets', label: 'Активы', icon: '🏦', path: '/assets' },
    { id: 'balance', label: 'Баланс', icon: '💰', path: '/balance' },
    { id: 'journal', label: 'Дневник', icon: '📖', path: '/journal' },
    { id: 'settings', label: 'Настройки', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className="container min-h-screen pb-20">
      <h1 className="text-base font-semibold mb-1">Ещё</h1>
      <p className="text-xs text-muted mb-4">Все разделы приложения</p>

      <div className="space-y-2">
        {items.map((s) => (
          <ListRow
            key={s.id}
            icon={s.icon}
            title={s.label}
            path={s.path}
          />
        ))}
      </div>
    </div>
  );
};

export default More;
