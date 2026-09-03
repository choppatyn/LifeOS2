import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../hooks/useApi';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface LifeEvent {
  id: string;
  age: number;
  event: string;
  stage: string;
  description?: string;
}

const LifePath: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<LifeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ age: '', event: '', stage: '', description: '' });

  useEffect(() => {
    api.get('/profile/life-events').then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = async () => {
    await api.post('/profile/life-events', { event: { ...form, age: parseInt(form.age) } });
    setShowForm(false);
    setForm({ age: '', event: '', stage: '', description: '' });
    const data = await api.get('/profile/life-events');
    setItems(data);
  };

  if (loading) return <div className="p-4 text-center text-muted">Загрузка...</div>;

  return (
    <div className="container max-w-md mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/profile')} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">📜 Жизненный путь</h1>
        <span className="text-sm text-muted ml-auto">{items.length} событий</span>
      </div>

      <Button variant="gold" size="sm" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Отмена' : '+ Добавить'}
      </Button>

      {showForm && (
        <Card>
          <input
            type="number"
            placeholder="Возраст"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Событие"
            value={form.event}
            onChange={(e) => setForm({ ...form, event: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Этап (образование, карьера...)"
            value={form.stage}
            onChange={(e) => setForm({ ...form, stage: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Описание"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <Button variant="gold" fullWidth onClick={handleAdd}>Сохранить</Button>
        </Card>
      )}

      {items.length === 0 && (
        <div className="text-center text-muted py-8">Нет событий</div>
      )}

      <div className="relative pl-4 border-l-2 border-[#c9a84c] space-y-4">
        {items.map((item) => (
          <div key={item.id} className="pl-4">
            <div className="absolute -left-[9px] w-3 h-3 bg-[#c9a84c] rounded-full" />
            <div className="text-sm text-muted">{item.age} лет</div>
            <div className="font-medium text-gold">{item.event}</div>
            <div className="text-xs text-muted">{item.stage}</div>
            {item.description && <div className="text-sm text-muted mt-1">{item.description}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifePath;
