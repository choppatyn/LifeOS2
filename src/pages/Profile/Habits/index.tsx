import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';

interface Habit {
  id: string;
  name: string;
  streak: number;
  progress: number;
}

const STORAGE_KEY = 'lifeos.habits';

const Habits: React.FC = () => {
  const navigate = useNavigate();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Habit | null>(null);

  // Поля формы
  const [name, setName] = useState('');
  const [streak, setStreak] = useState('0');
  const [progress, setProgress] = useState('0');

  // Загрузка из localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setHabits(JSON.parse(raw)); } catch {}
    } else {
      // Первый запуск — демо-данные
      const demo: Habit[] = [
        { id: '1', name: 'Отказ от сахара', streak: 12, progress: 85 },
        { id: '2', name: 'Зарядка по утрам', streak: 8, progress: 70 },
        { id: '3', name: 'Чтение 30 минут', streak: 5, progress: 60 },
        { id: '4', name: 'Медитация', streak: 3, progress: 40 },
      ];
      setHabits(demo);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    }
  }, []);

  // Сохранение в localStorage
  const persist = (next: Habit[]) => {
    setHabits(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const openNew = () => {
    setEditing(null);
    setName('');
    setStreak('0');
    setProgress('0');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (habit: Habit) => {
    setEditing(habit);
    setName(habit.name);
    setStreak(String(habit.streak));
    setProgress(String(habit.progress));
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const data = {
      name: name.trim(),
      streak: parseInt(streak) || 0,
      progress: Math.min(100, Math.max(0, parseInt(progress) || 0)),
    };

    if (editing) {
      persist(habits.map((h) => (h.id === editing.id ? { ...h, ...data } : h)));
    } else {
      persist([{ ...data, id: Date.now().toString() }, ...habits]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить привычку?')) {
      persist(habits.filter((h) => h.id !== id));
    }
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
        <span className="text-xs text-muted ml-auto">{habits.length} шт.</span>
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
                placeholder="0"
                className="input"
              />
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Прогресс (%)</div>
              <input
                type="number"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                className="input"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-gold flex-1" disabled={!name.trim()}>
              {editing ? 'Сохранить' : 'Добавить'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="btn-outline-gold">
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Список */}
      {habits.length === 0 ? (
        <div className="text-center text-muted py-8">
          Пока нет привычек.
          <br />
          Нажми «+», чтобы добавить первую.
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((item) => (
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
