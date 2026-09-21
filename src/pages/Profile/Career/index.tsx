import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';
import { useCareer, CareerItem } from './hooks/useCareer';

const Career: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, saving, addItem, updateItem, deleteItem } = useCareer();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CareerItem | null>(null);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');

  const openNew = () => {
    setEditing(null);
    setCompany(''); setPosition(''); setStart(''); setEnd(''); setDescription('');
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: CareerItem) => {
    setEditing(item);
    setCompany(item.company); setPosition(item.position); setStart(item.start); setEnd(item.end); setDescription(item.description);
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!company.trim() || !position.trim()) return;
    const data = { company: company.trim(), position: position.trim(), start: start.trim(), end: end.trim(), description: description.trim() };
    if (editing) await updateItem(editing.id, data); else await addItem(data);
    setShowForm(false); setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить?')) await deleteItem(id);
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Карьера</span>
        <span className="text-xs text-muted ml-auto">{items.length} мест</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">{editing ? 'Редактировать' : 'Новое место'}</div>
          <div>
            <div className="text-xs text-muted mb-1">Компания *</div>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className="input" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Должность *</div>
            <input value={position} onChange={(e) => setPosition(e.target.value)} className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Начало</div>
              <input value={start} onChange={(e) => setStart(e.target.value)} className="input" placeholder="2021" />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Окончание</div>
              <input value={end} onChange={(e) => setEnd(e.target.value)} className="input" placeholder="сейчас" />
            </div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Описание</div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input" rows={2} />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!company.trim() || !position.trim() || saving}>
              {saving ? 'Сохранение…' : editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-muted py-8">Загрузка…</div>
      ) : items.length === 0 ? (
        <div className="text-center text-muted py-8">Пока нет записей.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="card cursor-pointer hover:border-[#c9a84c]" onClick={() => openEdit(item)}>
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

      <FloatingAddButton onClick={openNew} ariaLabel="Добавить" />
    </div>
  );
};

export default Career;
