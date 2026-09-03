import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';

const Career: React.FC = () => {
  const navigate = useNavigate();
  const [career] = useState([
    { id: '1', company: 'Мой проект', position: 'Руководитель проекта', start: '2021', end: '2023' },
    { id: '2', company: 'Организация', position: 'Маркетолог', start: '2021', end: '2023' },
    { id: '3', company: 'Digital-агентство', position: 'Маркетолог', start: '2021', end: '2023' },
  ]);

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">
          ←
        </button>
        <h1 className="text-xl font-bold">💼 Карьера</h1>
        <span className="text-sm text-muted ml-auto">{career.length} мест</span>
      </div>

      <div className="space-y-3">
        {career.map((item) => (
          <Card key={item.id}>
            <div className="font-medium text-[#c9a84c]">{item.position}</div>
            <div className="text-sm text-muted">{item.company}</div>
            <div className="text-xs text-muted">{item.start} – {item.end}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Career;
