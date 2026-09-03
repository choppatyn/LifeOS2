import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const [documents] = useState([
    { id: '1', name: 'Виза ОАЭ', number: '125456789', expiry: '14.12.2024' },
    { id: '2', name: 'Страховка', number: '167654321', expiry: '01.03.2025' },
    { id: '3', name: 'Диплом бакалавра', number: '123456', expiry: '30.06.2017' },
    { id: '4', name: 'Загранпаспорт', number: '77 1244567', expiry: '18.06.2030' },
  ]);

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">📄 Личные документы</h1>
        <span className="text-sm text-muted ml-auto">{documents.length} документов</span>
      </div>

      <div className="space-y-3">
        {documents.map((item) => (
          <Card key={item.id}>
            <div className="font-medium text-[#c9a84c]">{item.name}</div>
            <div className="text-sm text-muted">№ {item.number}</div>
            <div className="text-xs text-muted">Действительно до {item.expiry}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Documents;
