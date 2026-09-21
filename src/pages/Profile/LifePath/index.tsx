import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';
import { useLifePath, LifeEvent } from './hooks/useLifePath';

const LifePath: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, saving, addItem, updateItem, deleteItem } = useLifePath();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<LifeEvent | null>(null);
  const [age, setAge] = useState('');
  const [event, setEvent] = useState('');
  const [stage, setStage] = useState('');

  const openNew = () => {
    setEditing(null); setAge(''); setEvent(''); setStage('');
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: LifeEvent) => {
    setEditing(item); setAge(item.age); setEvent(item.event); setStage(item.stage);
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!event.trim()) return;
    const data = { age: age.trim(), event: event.trim(), stage: stage.trim() };
    if (editing) await updateItem(editing.id, data); else await addItem(data);
    setShowForm(false); setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить событие?')) await deleteItem(id);
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Жизненный путь</span>
        <span className="text-xs text-muted ml-auto">{items.length} событий</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">{editing ? 'Редактировать' : 'Новое событие'}</div>
          <div>
            <div className="text-xs text-muted mb-1">Возраст</div>
            <input value={age} onChange={(e) => setAge(e.target.value)} className="input" placeholder="18" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Событие *</div>
            <input value={event} onChange={(e) => setEvent(e.target.value)} className="input" placeholder="Поступил в университет" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Этап</div>
            <input value={stage} onChange={(e) => setStage(e.target.value)} className="input" placeholder="Образование / Карьера / Личное" />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!event.trim() || saving}>
              {saving ? 'Сохранение…' : editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-muted py-8">Загрузка…</div>
      ) : items.length === 0 ? (
        <div className="text-center text-muted py-8">Пока нет событий.</div>
      ) : (
        <div className="relative pl-4 border-l-2 border-[#c9a84c] space-y-4">
          {items.map((item) => (
            <div key={item.id} className="relative pl-4 cursor-pointer group" onClick={() => openEdit(item)}>
              <div className="absolute -left-[9px] top-1 w-3 h-3 bg-[#c9a84c] rounded-full" />
              <div className="text-xs text-muted">{item.age ? `${item.age} лет` : '—'}</div>
              <div className="font-medium text-[#c9a84c]">{item.event}</div>
              <div className="text-xs text-muted">{item.stage}</div>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="text-muted hover:text-[#ef4444] text-xs mt-1">Удалить</button>
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton onClick={openNew} ariaLabel="Добавить" />
    </div>
  );
};

export default LifePath;
