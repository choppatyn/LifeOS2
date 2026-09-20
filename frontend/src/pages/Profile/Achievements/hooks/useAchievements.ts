import { useEffect, useState, useCallback } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date: string;        // YYYY-MM-DD
  category: string;    // 'personal' | 'career' | 'finance' | 'health' | 'travel'
  icon?: string;
}

export const CATEGORIES = [
  { id: 'all',      label: 'Все',         icon: '🏆' },
  { id: 'personal', label: 'Личные',      icon: '💫' },
  { id: 'career',   label: 'Карьера',     icon: '💼' },
  { id: 'finance',  label: 'Финансы',     icon: '💰' },
  { id: 'health',   label: 'Здоровье',    icon: '❤️' },
  { id: 'travel',   label: 'Путешествия', icon: '✈️' },
];

const STORAGE_KEY = 'lifeos.achievements';
const API_URL = import.meta.env.VITE_API_URL || '/api';

export function useAchievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== Загрузка =====
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/profile/achievements`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data)) {
            setItems(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            setLoading(false);
            return;
          }
        }
      } catch {
        // уйдём в localStorage
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && !cancelled) {
        try {
          setItems(JSON.parse(raw));
        } catch {}
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ===== Сохранение всего массива =====
  const persist = useCallback(async (next: Achievement[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    try {
      setSaving(true);
      await fetch(`${API_URL}/profile/achievements`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
    } catch {
      setError('Сохранено локально — сервер недоступен');
    } finally {
      setSaving(false);
    }
  }, []);

  const addAchievement = useCallback(
    async (data: Omit<Achievement, 'id'>) => {
      const item: Achievement = { ...data, id: Date.now().toString() };
      await persist([item, ...items]);
      return item;
    },
    [items, persist]
  );

  const updateAchievement = useCallback(
    async (id: string, data: Partial<Achievement>) => {
      const next = items.map((i) => (i.id === id ? { ...i, ...data } : i));
      await persist(next);
    },
    [items, persist]
  );

  const deleteAchievement = useCallback(
    async (id: string) => {
      const next = items.filter((i) => i.id !== id);
      await persist(next);
    },
    [items, persist]
  );

  // ===== Статистика =====
  const total = items.length;
  const thisYear = items.filter((i) => {
    const d = new Date(i.date);
    return d.getFullYear() === new Date().getFullYear();
  }).length;

  return {
    items,
    loading,
    saving,
    error,
    total,
    thisYear,
    addAchievement,
    updateAchievement,
    deleteAchievement,
  };
}
