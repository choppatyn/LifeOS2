import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAchievements, Achievement, CATEGORIES } from './hooks/useAchievements';
import { AchievementCard } from './components/AchievementCard';
import { AchievementForm } from './components/AchievementForm';

const Achievements: React.FC = () => {
  const navigate = useNavigate();
  const {
    items, loading, saving, total, thisYear,
    addAchievement, updateAchievement, deleteAchievement,
  } = useAchievements();

  const [filter, setFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);

  const filtered =
    filter === 'all' ? items : items.filter((i) => i.category === filter);

  const handleSave = async (data: Omit<Achievement, 'id'>) => {
    if (editingItem) {
      await updateAchievement(editingItem.id, data);
    } else {
      await addAchievement(data);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (item: Achievement) => {
    setEditingItem(item);
    setShowForm(true);
  };

  return (
<div className="container min-h-screen pb-24">
      {/* Шапка */}
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button
          onClick={() => navigate('/profile/subsections')}
          className="text-2xl text-muted hover:text-[#c9a84c] transition-colors"
          aria-label="Назад"
        >
          ←
        </button>
        <span className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">
          Достижения
        </span>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-[#c9a84c]">{total}</div>
          <div className="text-[11px] text-muted mt-1 whitespace-nowrap">Всего достижений</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-[#c9a84c]">{thisYear}</div>
          <div className="text-[11px] text-muted mt-1 whitespace-nowrap">В этом году</div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
  filter === c.id
    ? 'font-semibold'
    : 'text-muted'
}`}
style={
  filter === c.id
    ? { background: 'var(--color-gold)', color: '#0a0808' }
    : { background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }
}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Форма */}
      {showForm && (
        <div className="card mb-4">
          <AchievementForm
            initial={editingItem}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            saving={saving}
          />
        </div>
      )}

      {/* Список */}
      {loading ? (
        <div className="text-center text-muted py-8">Загрузка…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted py-8">
          Пока нет достижений.
          <br />
          Нажми «+», чтобы добавить первое.
        </div>
      ) : (
        <div>
          {filtered.map((item) => (
            <AchievementCard
              key={item.id}
              item={item}
              onClick={() => handleEdit(item)}
            />
          ))}
        </div>
      )}

      {/* Кнопка "+" */}
    <FloatingAddButton
  onClick={() => {
    setEditingItem(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  ariaLabel="Добавить достижение"
/>
    </div>
  );
};

export default Achievements;
