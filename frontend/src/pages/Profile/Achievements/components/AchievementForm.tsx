import React, { useState } from 'react';
import { Achievement, CATEGORIES } from '../hooks/useAchievements';

interface AchievementFormProps {
  initial?: Achievement | null;
  onSave: (data: Omit<Achievement, 'id'>) => void;
  onCancel: () => void;
  saving?: boolean;
}

export const AchievementForm: React.FC<AchievementFormProps> = ({
  initial,
  onSave,
  onCancel,
  saving,
}) => {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [date, setDate] = useState(
    initial?.date?.slice(0, 10) || new Date().toISOString().slice(0, 10)
  );
  const [category, setCategory] = useState(initial?.category || 'personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      date,
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="text-xs text-muted uppercase tracking-wider mb-1">
        {initial ? 'Редактировать достижение' : 'Новое достижение'}
      </div>

      <Field label="Название *">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Открыл свой бизнес"
          className="input"
          required
        />
      </Field>

      <Field label="Описание">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Коротко о том, что это значило для тебя"
          className="input"
          rows={3}
        />
      </Field>

      <Field label="Дата">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Категория">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                category === c.id
                  ? 'bg-[#c9a84c] text-black font-semibold'
                  : 'bg-[#1a1515] border border-[#2a2323] text-muted'
              }`}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </Field>

      <div className="flex gap-2 pt-2">
        <button type="submit" className="btn-gold flex-1" disabled={saving || !title.trim()}>
          {saving ? 'Сохранение…' : initial ? 'Сохранить' : 'Добавить'}
        </button>
        <button type="button" className="btn-outline-gold" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div>
    <div className="text-xs text-muted mb-1">{label}</div>
    {children}
  </div>
);
