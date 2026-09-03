import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../hooks/useApi';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface Travel {
  id: string;
  country: string;
  city: string;
  date: string;
  days: number;
  purpose: string;
  impression: string;
}

const Travels: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ country: '', city: '', date: '', days: '', purpose: '', impression: '' });

  useEffect(() => {
    api.get('/profile/travels').then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = async () => {
    await api.post('/profile/travels', { travel: { ...form, days: parseInt(form.days) } });
    setShowForm(false);
    setForm({ country: '', city: '', date: '', days: '', purpose: '', impression: '' });
    const data = await api.get('/profile/travels');
    setItems(data);
  };

  if (loading) return <div className="p-4 text-center text-muted">Загрузка...</div>;

  return (
    <div className="container max-w-md mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/profile')} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">🌍 Путешествия</h1>
        <span className="text-sm text-muted ml-auto">{items.length} стран</span>
      </div>

      <Button variant="gold" size="sm" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Отмена' : '+ Добавить'}
      </Button>

      {showForm && (
        <Card>
          <input
            type="text"
            placeholder="Страна"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Город"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="number"
            placeholder="Дней"
            value={form.days}
            onChange={(e) => setForm({ ...form, days: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Цель поездки"
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <input
            type="text"
            placeholder="Впечатление"
            value={form.impression}
            onChange={(e) => setForm({ ...form, impression: e.target.value })}
            className="w-full p-2 mb-2 rounded bg-[#1a1515] border border-[#2a2323] text-light"
          />
          <Button variant="gold" fullWidth onClick={handleAdd}>Сохранить</Button>
        </Card>
      )}

      {items.length === 0 && (
        <div className="text-center text-muted py-8">Нет путешествий</div>
      )}

      {items.map((item) => (
        <Card key={item.id}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gold">{item.country}, {item.city}</div>
              <div className
