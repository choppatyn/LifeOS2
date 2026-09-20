import React, { useState, useEffect } from 'react';
import { ProfileData } from '../hooks/useProfile';

interface ProfileInfoFormProps {
  initial: ProfileData;
  onSave: (data: Partial<ProfileData>) => void;
  onCancel: () => void;
  saving?: boolean;
}

export const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({
  initial,
  onSave,
  onCancel,
  saving,
}) => {
  const [form, setForm] = useState<ProfileData>(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <div className="text-xs text-muted uppercase tracking-wider mb-1">
        Заполните профиль
      </div>

      <Field label="Имя и фамилия">
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Кирилл Смирнов"
          className="input"
        />
      </Field>

      <Field label="Дата рождения">
        <input
          type="date"
          value={form.birthDate?.slice(0, 10) || ''}
          onChange={(e) => handleChange('birthDate', e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Гражданство при рождении">
        <input
          type="text"
          value={form.birthCitizenship}
          onChange={(e) => handleChange('birthCitizenship', e.target.value)}
          placeholder="Россия"
          className="input"
        />
      </Field>

      <Field label="Действующие гражданства">
        <input
          type="text"
          value={form.currentCitizenships}
          onChange={(e) => handleChange('currentCitizenships', e.target.value)}
          placeholder="Россия, ОАЭ"
          className="input"
        />
      </Field>

      <Field label="Город">
        <input
          type="text"
          value={form.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="Дубай, ОАЭ"
          className="input"
        />
      </Field>

      <Field label="Деятельность">
        <input
          type="text"
          value={form.occupation}
          onChange={(e) => handleChange('occupation', e.target.value)}
          placeholder="Предприниматель"
          className="input"
        />
      </Field>

      <Field label="Ключевая идея жизни">
        <textarea
          value={form.lifeIdea}
          onChange={(e) => handleChange('lifeIdea', e.target.value)}
          placeholder="Свобода через создание ценности"
          className="input"
          rows={2}
        />
      </Field>

      <Field label="Ключевая мечта на жизнь">
        <textarea
          value={form.lifeDream}
          onChange={(e) => handleChange('lifeDream', e.target.value)}
          placeholder="Путешествовать и жить в разных странах"
          className="input"
          rows={2}
        />
      </Field>

      <Field label="Семейное положение">
        <input
          type="text"
          value={form.maritalStatus}
          onChange={(e) => handleChange('maritalStatus', e.target.value)}
          placeholder="Не женат"
          className="input"
        />
      </Field>

      <Field label="Статус">
        <input
          type="text"
          value={form.status}
          onChange={(e) => handleChange('status', e.target.value)}
          placeholder="В процессе"
          className="input"
        />
      </Field>

      <div className="flex gap-2 pt-2">
        <button type="submit" className="btn-gold flex-1" disabled={saving}>
          {saving ? 'Сохранение...' : 'Сохранить'}
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
