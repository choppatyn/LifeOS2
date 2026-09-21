import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';
import { RELATIONSHIP_TYPES } from '../../../lib/relationshipTypes';
import { CONTACT_ROLES } from '../../../lib/contactRoles';
import { useRelationships, Relationship } from './hooks/useRelationships';

const Relationships: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, saving, addItem, updateItem, deleteItem } = useRelationships();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Relationship | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');

  const openNew = () => {
    setEditing(null);
    setName(''); setType(''); setRole(''); setDescription('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (item: Relationship) => {
    setEditing(item);
    setName(item.name); setType(item.type || ''); setRole(item.role || ''); setDescription(item.description || '');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    const data = {
      name: name.trim(),
      type: type.trim(),
      role: role.trim(),
      description: description.trim(),
    };
    if (editing) await updateItem(editing.id, data);
    else await addItem(data);
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить контакт?')) await deleteItem(id);
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Личные отношения</span>
        <span className="text-xs text-muted ml-auto">{items.length} чел.</span>
      </div>

      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">
            {editing ? 'Редактировать контакт' : 'Новый контакт'}
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Имя *</div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Анна Смирнова" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Кем приходится</div>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="input" style={{ cursor: 'pointer' }}>
              <option value="">— Выберите —</option>
              {CONTACT_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Кто это (любовь / интим)</div>
            <select value={type} onChange={(e) => setType(e.target.value)} className="input" style={{ cursor: 'pointer' }}>
              <option value="">— Выберите —</option>
              {RELATIONSHIP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Описание</div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input" rows={2} />
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
        <div className="text-center text-muted py-8">Пока нет контактов.<br />Нажми «+», чтобы добавить.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="card cursor-pointer hover:border-[#c9a84c] transition-all" onClick={() => openEdit(item)}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#c9a84c]">{item.name}</div>
                  {(item.role || item.type) && (
                    <div className="text-xs text-muted">
                      {item.role}{item.role && item.type && ' • '}{item.type}
                    </div>
                  )}
                  {item.description && <div className="text-xs text-muted mt-1">{item.description}</div>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="text-muted hover:text-[#ef4444] text-xs">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton onClick={openNew} ariaLabel="Добавить контакт" />
    </div>
  );
};

export default Relationships;
