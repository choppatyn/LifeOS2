import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';

interface Identity {
  whoAmI: string;
  values: string;
  principles: string;
  strengths: string;
  weaknesses: string;
  futureSelf: string;
}

const STORAGE_KEY = 'lifeos.identity';

const EMPTY: Identity = {
  whoAmI: '',
  values: '',
  principles: '',
  strengths: '',
  weaknesses: '',
  futureSelf: '',
};

const IdentityPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Identity>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Identity>(EMPTY);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setData(JSON.parse(raw)); } catch {}
    }
  }, []);

  const openEdit = () => {
    setForm(data);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    setData(form);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setShowForm(false);
  };

  const rows: { key: keyof Identity; label: string }[] = [
    { key: 'whoAmI', label: 'Кто я' },
    { key: 'values', label: 'Мои ценности' },
    { key: 'principles', label: 'Мои принципы' },
    { key: 'strengths', label: 'Сильные стороны' },
    { key: 'weaknesses', label: 'Слабые стороны' },
    { key: 'futureSelf', label: 'Каким хочу стать' },
  ];

  return (
    <div className="container min-h-screen pb-24">
      {/* Шапка */}
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button
          onClick={() => navigate('/profile/subsections')}
          className="text-2xl text-muted hover:text-[#c9a84c]"
          aria-label="Назад"
        >
          ←
        </button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">
          Идентичность
        </span>
      </div>

      {/* Форма */}
      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">
            Редактировать
          </div>

          {rows.map((r) => (
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
            <button onClick={handleSave} className="btn-gold flex-1">
              Сохранить
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="btn-outline-gold"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Просмотр */}
      {!showForm && (
        <div className="card space-y-3">
          {rows.map((r) => (
            <div key={r.key}>
              <div className="text-xs text-muted uppercase tracking-wider mb-1">
                {r.label}
              </div>
              <div className="text-sm">
                {data[r.key] || '—'}
              </div>
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton onClick={openEdit} ariaLabel="Редактировать" />
    </div>
  );
};

export default IdentityPage;
