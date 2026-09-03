import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../hooks/useApi';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ProgressBar } from '../../../components/ui/ProgressBar';

interface Habit {
  id: string;
  name: string;
  type: string;
  frequency: string;
  streak: number;
  progress: number;
}

const Habits: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', frequency: '' });

  useEffect(() => {
    api.get('/profile/habits').then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = async () => {
    await api.post('/profile/habits', { habit: form });
    setShowForm(false);
    setForm({ name: '', type: '', frequency: '' });
    const data = await api.get('/profile/habits');
    setItems(data);
  };

  if (loading) return <div className="p-4 text-center text-muted">Загрузка...</div>;

  return (
    <div className="container max-w-md mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/profile')} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">🔄 Привычки</h1>
        <span className="text-sm text-muted ml-auto">{items.length} привычек</span>
      </div>

      <Button variant="gold" size="sm" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Отмена' : '+ Добавить'}
      </Button>

      {showForm && (
        <Card>
          <input
            type="text"
            placeholder="Название привычки"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Тип (спорт, питание, сон...)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Периодичность (ежедневно, еженедельно...)"
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <Button variant="gold" fullWidth onClick={handleAdd}>Сохранить</Button>
        </Card>
      )}

      {items.length === 0 && (
        <div className="text-center text-muted py-8">Нет привычек</div>
      )}

      {items.map((item) => (
        <Card key={item.id}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gold">{item.name}</div>
              <div className="text-xs text-muted">{item.type} • {item.frequency}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gold">🔥 {item.streak} дней</div>
              <div className="text-xs text-muted">{item.progress}%</div>
            </div>
          </div>
          <ProgressBar value={item.progress} size="sm" className="mt-2" />
        </Card>
      ))}
    </div>
  );
};

export default Habits;
