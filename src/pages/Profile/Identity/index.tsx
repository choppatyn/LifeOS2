import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Identity: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">🧘 Идентичность</h1>
      </div>

      <Card>
        <div className="space-y-3 text-sm">
          <div>
            <div className="text-muted">Кто я</div>
            <div className="font-medium text-[#e8e0d8]">Предприниматель, создатель Life OS</div>
          </div>
          <div>
            <div className="text-muted">Мои ценности</div>
            <div className="font-medium text-[#e8e0d8]">Свобода, создание, развитие</div>
          </div>
          <div>
            <div className="text-muted">Мои принципы</div>
            <div className="font-medium text-[#e8e0d8]">Действие, ответственность, рост</div>
          </div>
          <div>
            <div className="text-muted">Мои сильные стороны</div>
            <div className="font-medium text-[#e8e0d8]">Лидерство, стратегия, коммуникация</div>
          </div>
          <div>
            <div className="text-muted">Каким человеком хочу стать</div>
            <div className="font-medium text-[#e8e0d8]">Свободным и влиятельным</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Identity;
