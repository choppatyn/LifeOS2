import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface BottomNavProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ items, activeId, onSelect }) => {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`nav-item ${activeId === item.id ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
