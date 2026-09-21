import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';

interface Travel {
  id: string;
  country: string;
  city: string;
  date: string;
  days: string;
  purpose: string;
}

const STORAGE_KEY = 'lifeos.travels';

const Travels: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Travel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Travel | null>(null);

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [days, setDays] = useState('');
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch {}
    } else {
      const demo: Travel[] = [
        { id: '1', country: 'ОАЭ', city: 'Дубай', date: '2022-06-15', days: '365', purpose: 'Жизнь' },
        { id: '2', country: 'Турция', city: 'Стамбул', date: '2023-03-10', days: '7', purpose: 'Отдых' },
      ];
      setItems(demo);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    }
  }, []);

  const persist = (next: Travel[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const openNew = () => {
    setEditing(null); setCountry(''); setCity(''); setDate(''); setDays(''); setPurpose('');
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: Travel) => {
    setEditing(item);
    setCountry(item.country); setCity(item.city);
    setDate(item.date); setDays(item.days); setPurpose(item.purpose);
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    if (!country.trim()) return;
    const data = {
      country: country.trim(), city: city.trim(),
      date, days: days.trim(), purpose: purpose.trim(),
    };
    if (editing) {
      persist(items.map((i) => (i.id === editing.id ? { ...i, ...data } : i)));
    } else {
      persist([{ ...data, id: Date.now().toString() }, ...items]);
    }
    setShowForm(false); setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить путешествие?')) persist(items.filter((i) => i.id !== id));
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]" aria-label="Назад">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Путешествия</span>
        <span className="text-xs text-muted ml-auto">{items.length} стран</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">
            {editing ? 'Редактировать путешествие' : 'Новое путешествие'}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Страна *</div>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="ОАЭ" className="input" />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Город</div>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Дубай" className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Дата</div>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Дней</div>
              <input type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="7" className="input" />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Цель поездки</div>
            <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Отдых / Работа / Жизнь" className="input" />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!country.trim()}>
              {editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center text-muted py-8">Пока нет путешествий.<br />Нажми «+», чтобы добавить.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="card cursor-pointer hover:border-[#c9a84c] transition-all" onClick={() => openEdit(item)}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-[#c9a84c]">
                    {item.country}{item.city && `, ${item.city}`}
                  </div>
                  <div className="text-xs text-muted">
                    {item.days && `${item.days} дней`}
                    {item.purpose && ` • ${item.purpose}`}
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="text-muted hover:text-[#ef4444] text-xs">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton onClick={openNew} ariaLabel="Добавить путешествие" />
    </div>
  );
};

export default Travels;
