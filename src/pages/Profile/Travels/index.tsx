import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';
import { useTravels, Travel } from './hooks/useTravels';

const Travels: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, saving, addItem, updateItem, deleteItem } = useTravels();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Travel | null>(null);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [days, setDays] = useState('');
  const [purpose, setPurpose] = useState('');

  const openNew = () => {
    setEditing(null);
    setCountry(''); setCity(''); setDate(''); setDays(''); setPurpose('');
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: Travel) => {
    setEditing(item);
    setCountry(item.country); setCity(item.city);
    setDate(item.date); setDays(item.days); setPurpose(item.purpose);
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!country.trim()) return;
    const data = {
      country: country.trim(),
      city: city.trim(),
      date,
      days: days.trim(),
      purpose: purpose.trim(),
    };
    if (editing) await updateItem(editing.id, data);
    else await addItem(data);
    setShowForm(false); setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить путешествие?')) await deleteItem(id);
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Путешествия</span>
        <span className="text-xs text-muted ml-auto">{items.length} стран</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">{editing ? 'Редактировать' : 'Новое путешествие'}</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Страна *</div>
              <input value={country} onChange={(e) => setCountry(e.target.value)} className="input" placeholder="ОАЭ" />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Город</div>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="input" placeholder="Дубай" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Дата</div>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Дней</div>
              <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="input" placeholder="7" />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Цель поездки</div>
            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} className="input" placeholder="Отдых / Работа / Жизнь" />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!country.trim() || saving}>
              {saving ? 'Сохранение…' : editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-muted py-8">Загрузка…</div>
      ) : items.length === 0 ? (
        <div className="text-center text-muted py-8">Пока нет путешествий.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="card cursor-pointer hover:border-[#c9a84c]" onClick={() => openEdit(item)}>
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

      <FloatingAddButton onClick={openNew} ariaLabel="Добавить" />
    </div>
  );
};

export default Travels;
