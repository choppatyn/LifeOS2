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
    <nav className="fixed bottom-0 left-0 right-0 bg-[#141010] border-t border-[#2a2323] px-2 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all relative ${
              activeId === item.id ? 'text-[#c9a84c]' : 'text-[#6b635a]'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
            {activeId === item.id && (
              <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-[#c9a84c] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
