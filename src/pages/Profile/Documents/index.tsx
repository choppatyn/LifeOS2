import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';
import { useDocuments, DocumentItem } from './hooks/useDocuments';

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, saving, addItem, updateItem, deleteItem } = useDocuments();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DocumentItem | null>(null);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const openNew = () => {
    setEditing(null); setName(''); setNumber(''); setIssueDate(''); setExpiryDate('');
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: DocumentItem) => {
    setEditing(item); setName(item.name); setNumber(item.number); setIssueDate(item.issueDate); setExpiryDate(item.expiryDate);
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    const data = { name: name.trim(), number: number.trim(), issueDate, expiryDate };
    if (editing) await updateItem(editing.id, data); else await addItem(data);
    setShowForm(false); setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить документ?')) await deleteItem(id);
  };

  const fmt = (d: string) => {
    if (!d) return '—';
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? d : dt.toLocaleDateString('ru-RU');
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Документы</span>
        <span className="text-xs text-muted ml-auto">{items.length} шт.</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">{editing ? 'Редактировать' : 'Новый документ'}</div>
          <div>
            <div className="text-xs text-muted mb-1">Название *</div>
            <input value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Паспорт / Виза" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Номер</div>
            <input value={number} onChange={(e) => setNumber(e.target.value)} className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Дата выдачи</div>
              <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="input" />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Действителен до</div>
              <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="input" />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!name.trim() || saving}>
              {saving ? 'Сохранение…' : editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-muted py-8">Загрузка…</div>
      ) : items.length === 0 ? (
        <div className="text-center text-muted py-8">Пока нет документов.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="card cursor-pointer hover:border-[#c9a84c]" onClick={() => openEdit(item)}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-[#c9a84c]">{item.name}</div>
                  {item.number && <div className="text-sm text-muted">№ {item.number}</div>}
                  {item.expiryDate && <div className="text-xs text-muted">Действителен до {fmt(item.expiryDate)}</div>}
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

export default Documents;
