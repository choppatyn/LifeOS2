import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';

interface LifeEvent {
  id: string;
  age: string;
  event: string;
  stage: string;
}

const STORAGE_KEY = 'lifeos.lifepath';

const LifePath: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<LifeEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<LifeEvent | null>(null);

  const [age, setAge] = useState('');
  const [event, setEvent] = useState('');
  const [stage, setStage] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch {}
    } else {
      const demo: LifeEvent[] = [
        { id: '1', age: '18', event: 'Поступил в университет', stage: 'Образование' },
        { id: '2', age: '22', event: 'Первая работа', stage: 'Карьера' },
        { id: '3', age: '25', event: 'Создал бизнес', stage: 'Предпринимательство' },
      ];
      setItems(demo);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    }
  }, []);

  const persist = (next: LifeEvent[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const openNew = () => {
    setEditing(null); setAge(''); setEvent(''); setStage('');
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: LifeEvent) => {
    setEditing(item); setAge(item.age); setEvent(item.event); setStage(item.stage);
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    if (!event.trim()) return;
    const data = { age: age.trim(), event: event.trim(), stage: stage.trim() };
    if (editing) {
      persist(items.map((i) => (i.id === editing.id ? { ...i, ...data } : i)));
    } else {
      persist([{ ...data, id: Date.now().toString() }, ...items]);
    }
    setShowForm(false); setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить событие?')) persist(items.filter((i) => i.id !== id));
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]" aria-label="Назад">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Жизненный путь</span>
        <span className="text-xs text-muted ml-auto">{items.length} событий</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">
            {editing ? 'Редактировать событие' : 'Новое событие'}
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Возраст</div>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="18" className="input" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Событие *</div>
            <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} placeholder="Поступил в университет" className="input" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Этап</div>
            <input type="text" value={stage} onChange={(e) => setStage(e.target.value)} placeholder="Образование / Карьера / Личное" className="input" />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!event.trim()}>
              {editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center text-muted py-8">Пока нет событий.<br />Нажми «+», чтобы добавить.</div>
      ) : (
        <div className="relative pl-4 border-l-2 border-[#c9a84c] space-y-4">
          {items.map((item) => (
            <div key={item.id} className="relative pl-4 cursor-pointer group" onClick={() => openEdit(item)}>
              <div className="absolute -left-[9px] top-1 w-3 h-3 bg-[#c9a84c] rounded-full" />
              <div className="text-xs text-muted">{item.age ? `${item.age} лет` : '—'}</div>
              <div className="font-medium text-[#c9a84c]">{item.event}</div>
              <div className="text-xs text-muted">{item.stage}</div>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="text-muted hover:text-[#ef4444] text-xs mt-1 opacity-0 group-hover:opacity-100">Удалить</button>
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton onClick={openNew} ariaLabel="Добавить событие" />
    </div>
  );
};

export default LifePath;
