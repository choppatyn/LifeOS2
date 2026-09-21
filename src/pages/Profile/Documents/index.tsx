import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';

interface DocumentItem {
  id: string;
  name: string;
  number: string;
  issueDate: string;
  expiryDate: string;
}

const STORAGE_KEY = 'lifeos.documents';

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DocumentItem | null>(null);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch {}
    } else {
      const demo: DocumentItem[] = [
        { id: '1', name: 'Виза ОАЭ', number: '125456789', issueDate: '2023-12-14', expiryDate: '2024-12-14' },
        { id: '2', name: 'Страховка', number: '167654321', issueDate: '2024-03-01', expiryDate: '2025-03-01' },
      ];
      setItems(demo);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    }
  }, []);

  const persist = (next: DocumentItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const openNew = () => {
    setEditing(null); setName(''); setNumber(''); setIssueDate(''); setExpiryDate('');
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: DocumentItem) => {
    setEditing(item);
    setName(item.name); setNumber(item.number);
    setIssueDate(item.issueDate); setExpiryDate(item.expiryDate);
    setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const data = { name: name.trim(), number: number.trim(), issueDate, expiryDate };
    if (editing) {
      persist(items.map((i) => (i.id === editing.id ? { ...i, ...data } : i)));
    } else {
      persist([{ ...data, id: Date.now().toString() }, ...items]);
    }
    setShowForm(false); setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить документ?')) persist(items.filter((i) => i.id !== id));
  };

  const formatDate = (d: string) => {
    if (!d) return '—';
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]" aria-label="Назад">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Личные документы</span>
        <span className="text-xs text-muted ml-auto">{items.length} шт.</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">
            {editing ? 'Редактировать документ' : 'Новый документ'}
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Название *</div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Паспорт / Виза" className="input" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Номер</div>
            <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="125456789" className="input" />
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
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!name.trim()}>
              {editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center text-muted py-8">Пока нет документов.<br />Нажми «+», чтобы добавить.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="card cursor-pointer hover:border-[#c9a84c] transition-all" onClick={() => openEdit(item)}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium text-[#c9a84c]">{item.name}</div>
                  {item.number && <div className="text-sm text-muted">№ {item.number}</div>}
                  {item.expiryDate && <div className="text-xs text-muted">Действителен до {formatDate(item.expiryDate)}</div>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="text-muted hover:text-[#ef4444] text-xs">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton onClick={openNew} ariaLabel="Добавить документ" />
    </div>
  );
};

export default Documents;
