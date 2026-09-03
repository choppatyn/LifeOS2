import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../hooks/useApi';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  icon?: string;
}

const Achievements: React.FC = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', category: '' });

  useEffect(() => {
    api.get('/profile/achievements').then(data => {
      setAchievements(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = async () => {
    await api.post('/profile/achievements', { achievement: form });
    setShowForm(false);
    setForm({ title: '', description: '', date: '', category: '' });
    const data = await api.get('/profile/achievements');
    setAchievements(data);
  };

  if (loading) return <div className="p-4 text-center text-muted">Загрузка...</div>;

  return (
    <div className="container max-w-md mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/profile')} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">🏆 Достижения</h1>
        <span className="text-sm text-muted ml-auto">{achievements.length} всего</span>
      </div>

      <div className="flex gap-2">
        <Button variant="gold" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Отмена' : '+ Добавить'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <input
            type="text"
            placeholder="Название"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Категория"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
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
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <Button variant="gold" fullWidth onClick={handleAdd}>Сохранить</Button>
        </Card>
      )}

      {achievements.length === 0 && (
        <div className="text-center text-muted py-8">Нет достижений</div>
      )}

      {achievements.map((item) => (
        <Card key={item.id} className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gold">{item.title}</div>
            <div className="text-xs text-muted">{item.category} • {item.date}</div>
            {item.description && <div className="text-sm text-muted mt-1">{item.description}</div>}
          </div>
          <span className="text-2xl">🏆</span>
        </Card>
      ))}
    </div>
  );
};

export default Achievements;
