import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAchievements, Achievement, CATEGORIES } from './hooks/useAchievements';
import { AchievementCard } from './components/AchievementCard';
import { AchievementForm } from './components/AchievementForm';

const Achievements: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    loading,
    saving,
    total,
    thisYear,
    addAchievement,
    updateAchievement,
    deleteAchievement,
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

  const handleDelete = async (id: string) => {
    if (confirm('Удалить достижение?')) {
      await deleteAchievement(id);
    }
  };

  return (
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-24">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <button
          onClick={() => navigate('/profile/subsections')}
          className="text-2xl text-muted hover:text-[#c9a84c] transition-colors"
          aria-label="Назад"
        >
          ←
        </button>
        <span className="text-lg">🏆</span>
        <h2 className="text-sm font-semibold tracking-[0.2em] text-[#c9a84c] uppercase">
          Достижения
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-[#c9a84c]">{total}</div>
          <div className="text-xs text-muted mt-1">Всего достижений</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-[#c9a84c]">{thisYear}</div>
          <div className="text-xs text-muted mt-1">В этом году</div>
        </div>
      </div>

   <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
              filter === c.id
                ? 'bg-[#c9a84c] text-black font-semibold'
                : 'bg-[#1a1515] border border-[#2a2323] text-muted'
            }`}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

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

      {loading ? (
        <div className="text-center text-muted py-8">Загрузка…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted py-8">
          Пока нет достижений.
          <br />
          Нажми «+», чтобы добавить первое.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <AchievementCard
              key={item.id}
              item={item}
              onClick={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => {
          setEditingItem(null);
          setShowForm(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-transform hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
          color: '#0a0808',
          boxShadow: '0 8px 30px rgba(201,168,76,0.35)',
          zIndex: 40,
        }}
        aria-label="Добавить достижение"
      >
        +
      </button>
    </div>
  );
};

export default Achievements;
