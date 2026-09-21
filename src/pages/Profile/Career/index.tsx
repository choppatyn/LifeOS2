import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';

interface CareerItem {
  id: string;
  company: string;
  position: string;
  start: string;
  end: string;
  description: string;
}

const STORAGE_KEY = 'lifeos.career';

const Career: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CareerItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CareerItem | null>(null);

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch {}
    } else {
      const demo: CareerItem[] = [
        { id: '1', company: 'Мой проект', position: 'Руководитель проекта', start: '2021', end: '2023', description: '' },
        { id: '2', company: 'Digital-агентство', position: 'Маркетолог', start: '2019', end: '2021', description: '' },
      ];
      setItems(demo);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    }
  }, []);

  const persist = (next: CareerItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const openNew = () => {
    setEditing(null); setCompany(''); setPosition(''); setStart(''); setEnd(''); setDescription('');
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: CareerItem) => {
    setEditing(item);
    setCompany(item.company); setPosition(item.position);
    setStart(item.start); setEnd(item.end); setDescription(item.description);
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    if (!company.trim() || !position.trim()) return;
    const data = {
      company: company.trim(), position: position.trim(),
      start: start.trim(), end: end.trim(), description: description.trim(),
    };
    if (editing) {
      persist(items.map((i) => (i.id === editing.id ? { ...i, ...data } : i)));
    } else {
      persist([{ ...data, id: Date.now().toString() }, ...items]);
    }
    setShowForm(false); setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить место работы?')) persist(items.filter((i) => i.id !== id));
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]" aria-label="Назад">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Карьера</span>
        <span className="text-xs text-muted ml-auto">{items.length} мест</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">
            {editing ? 'Редактировать' : 'Новое место работы'}
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Компания *</div>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Название компании" className="input" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Должность *</div>
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Маркетолог" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Начало</div>
              <input type="text" value={start} onChange={(e) => setStart(e.target.value)} placeholder="2021" className="input" />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Окончание</div>
              <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="2023 / сейчас" className="input" />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Описание</div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Чем занимался" className="input" rows={2} />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!company.trim() || !position.trim()}>
              {editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center text-muted py-8">Пока нет записей.<br />Нажми «+», чтобы добавить.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="card cursor-pointer hover:border-[#c9a84c] transition-all" onClick={() => openEdit(item)}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-[#c9a84c]">{item.position}</div>
                  <div className="text-sm text-muted">{item.company}</div>
                  <div className="text-xs text-muted">{(item.start || '—') + ' – ' + (item.end || 'сейчас')}</div>
                  {item.description && <div className="text-xs text-muted mt-1">{item.description}</div>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="text-muted hover:text-[#ef4444] text-xs">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton onClick={openNew} ariaLabel="Добавить место работы" />
    </div>
  );
};

export default Career;
