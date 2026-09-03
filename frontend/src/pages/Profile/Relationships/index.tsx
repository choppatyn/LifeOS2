import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../hooks/useApi';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface Relationship {
  id: string;
  name: string;
  type: string;
  description: string;
  since: string;
}

const Relationships: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', description: '', since: '' });

  useEffect(() => {
    api.get('/profile/relationships').then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = async () => {
    await api.post('/profile/relationships', { relationship: form });
    setShowForm(false);
    setForm({ name: '', type: '', description: '', since: '' });
    const data = await api.get('/profile/relationships');
    setItems(data);
  };

  if (loading) return <div className="p-4 text-center text-muted">Загрузка...</div>;

  return (
    <div className="container max-w-md mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/profile')} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">💕 Личные отношения</h1>
        <span className="text-sm text-muted ml-auto">{items.length} человек</span>
      </div>

      <Button variant="gold" size="sm" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Отмена' : '+ Добавить'}
      </Button>

      {showForm && (
        <Card>
          <input
            type="text"
            placeholder="Имя"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Тип (мама, папа, друг...)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Описание"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="date"
            value={form.since}
            onChange={(e) => setForm({ ...form, since: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <Button variant="gold" fullWidth onClick={handleAdd}>Сохранить</Button>
        </Card>
      )}

      {items.length === 0 && (
        <div className="text-center text-muted py-8">Нет отношений</div>
      )}

      {items.map((item) => (
        <Card key={item.id} className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gold">{item.name}</div>
            <div className="text-xs text-muted">{item.type} • с {item.since}</div>
            {item.description && <div className="text-sm text-muted mt-1">{item.description}</div>}
          </div>
          <span className="text-2xl">💕</span>
        </Card>
      ))}
    </div>
  );
};

export default Relationships;
