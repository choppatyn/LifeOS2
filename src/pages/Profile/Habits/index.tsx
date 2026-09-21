import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';
import { useHabits, Habit } from './hooks/useHabits';

const Habits: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, saving, addHabit, updateHabit, deleteHabit } = useHabits();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Habit | null>(null);

  const [name, setName] = useState('');
  const [streak, setStreak] = useState('0');
  const [progress, setProgress] = useState('0');

  const openNew = () => {
    setEditing(null);
    setName(''); setStreak('0'); setProgress('0');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (h: Habit) => {
    setEditing(h);
    setName(h.name); setStreak(String(h.streak)); setProgress(String(h.progress));
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    const data = {
      name: name.trim(),
      streak: parseInt(streak) || 0,
      progress: Math.min(100, Math.max(0, parseInt(progress) || 0)),
    };
    if (editing) {
      await updateHabit(editing.id, data);
    } else {
      await addHabit(data);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Удалить привычку?')) await deleteHabit(id);
  };

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
          Привычки
        </span>
        <span className="text-xs text-muted ml-auto">{items.length} шт.</span>
      </div>

      {/* Форма */}
      {showForm && (
        <div className="card mb-4 space-y-3">
          <div className="text-xs text-muted uppercase tracking-wider">
            {editing ? 'Редактировать привычку' : 'Новая привычка'}
          </div>

          <div>
            <div className="text-xs text-muted mb-1">Название *</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Отказ от сахара"
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted mb-1">Дней подряд</div>
              <input
                type="number"
                value={streak}
                onChange={(e) => setStreak(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Прогресс (%)</div>
              <input
                type="number"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                min="0"
                max="100"
                className="input"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!name.trim() || saving}>
              {saving ? 'Сохранение…' : editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditing(null); }}
              className="btn-outline-gold"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Список */}
      {loading ? (
        <div className="text-center text-muted py-8">Загрузка…</div>
      ) : items.length === 0 ? (
        <div className="text-center text-muted py-8">
          Пока нет привычек.
          <br />
          Нажми «+», чтобы добавить первую.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="card cursor-pointer hover:border-[#c9a84c] transition-all"
              onClick={() => openEdit(item)}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-[#c9a84c]">{item.name}</div>
                <div className="text-right">
                  <div className="text-sm text-[#c9a84c]">🔥 {item.streak} дней</div>
                  <div className="text-xs text-muted">{item.progress}%</div>
                </div>
              </div>
              <div className="progress-bar mt-2">
                <div className="progress-fill" style={{ width: `${item.progress}%` }} />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  className="text-muted hover:text-[#ef4444] text-xs"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Кнопка "+" */}
      <FloatingAddButton onClick={openNew} ariaLabel="Добавить привычку" />
    </div>
  );
};

export default Habits;
