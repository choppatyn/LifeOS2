import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';
import { useIdentity, Identity } from './hooks/useIdentity';

const ROWS: { key: keyof Identity; label: string }[] = [
  { key: 'whoAmI', label: 'Кто я' },
  { key: 'values', label: 'Мои ценности' },
  { key: 'principles', label: 'Мои принципы' },
  { key: 'strengths', label: 'Сильные стороны' },
  { key: 'weaknesses', label: 'Слабые стороны' },
  { key: 'futureSelf', label: 'Каким хочу стать' },
];

const IdentityPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, saving, save } = useIdentity();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Identity>(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const openEdit = () => {
    setForm(data);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    await save(form);
    setShowForm(false);
  };

  return (
    <div className="container min-h-screen pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button onClick={() => navigate('/profile/subsections')} className="text-2xl text-muted hover:text-[#c9a84c]">←</button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">Идентичность</span>
      </div>

      {showForm ? (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">Редактировать</div>
          {ROWS.map((r) => (
            <div key={r.key}>
              <div className="text-xs text-muted mb-1">{r.label}</div>
              <textarea
                value={form[r.key]}
                onChange={(e) => setForm({ ...form, [r.key]: e.target.value })}
                className="input"
                rows={2}
              />
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={saving}>
              {saving ? 'Сохранение…' : 'Сохранить'}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-outline-gold">Отмена</button>
          </div>
        </div>
      ) : loading ? (
        <div className="text-center text-muted py-8">Загрузка…</div>
      ) : (
        <div className="card space-y-3">
          {ROWS.map((r) => (
            <div key={r.key}>
              <div className="text-xs text-muted uppercase tracking-wider mb-1">{r.label}</div>
              <div className="text-sm">{data[r.key] || '—'}</div>
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton onClick={openEdit} ariaLabel="Редактировать" />
    </div>
  );
};

export default IdentityPage;
