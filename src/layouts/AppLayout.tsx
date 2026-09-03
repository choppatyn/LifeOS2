import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'profile', label: 'Профиль', icon: '👤', path: '/profile' },
    { id: 'characteristics', label: 'Хар-ки', icon: '🧠', path: '/characteristics' },
    { id: 'skills', label: 'Навыки', icon: '⚔️', path: '/skills' },
    { id: 'society', label: 'Социум', icon: '👥', path: '/society' },
    { id: 'more', label: 'Ещё', icon: '📋', path: '/more' },
  ];

  // Определяем активную вкладку
  const activeTab = navItems.find(item => location.pathname.startsWith(item.path))?.id || 'profile';

  const handleSelect = (id: string) => {
    const item = navItems.find(i => i.id === id);
    if (item) {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
      <Outlet />
      <BottomNav items={navItems} activeId={activeTab} onSelect={handleSelect} />
    </div>
  );
};

export default AppLayout;
