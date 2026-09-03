import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Identity: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">🧘 Идентичность</h1>
      </div>

      <Card>
        <div className="space-y-4 text-sm">
          <div>
            <div className="text-muted text-xs uppercase tracking-wider mb-1">Кто я</div>
            <div className="font-medium">Предприниматель, создатель Life OS</div>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wider mb-1">Мои ценности</div>
            <div className="font-medium">Свобода, создание, развитие</div>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wider mb-1">Мои принципы</div>
            <div className="font-medium">Действие, ответственность, рост</div>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wider mb-1">Мои сильные стороны</div>
            <div className="font-medium">Лидерство, стратегия, коммуникация</div>
          </div>
          <div>
            <div className="text-muted text-xs uppercase tracking-wider mb-1">Каким человеком хочу стать</div>
            <div className="font-medium">Свободным и влиятельным</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Identity;
