import { useEffect, useState, useCallback } from 'react';
import { api } from '../../../../hooks/useApi';

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date: string;
  category: string;
  icon?: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'Все', icon: '🏆' },
  { id: 'personal', label: 'Личные', icon: '💫' },
  { id: 'career', label: 'Карьера', icon: '💼' },
  { id: 'finance', label: 'Финансы', icon: '💰' },
  { id: 'health', label: 'Здоровье', icon: '❤️' },
  { id: 'travel', label: 'Путешествия', icon: '✈️' },
];

const SECTION = 'achievements';
const STORAGE_KEY = 'lifeos.achievements';

export function useAchievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== Загрузка: сначала API, потом localStorage =====
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      // 1. Пытаемся загрузить с backend
      try {
        const res = await api.getData(SECTION);
        if (!cancelled && res && Array.isArray(res.data)) {
          setItems(res.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Backend unavailable, falling back to localStorage:', e);
      }

      // 2. Fallback — localStorage
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && !cancelled) {
        try {
          setItems(JSON.parse(raw));
        } catch {}
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // ===== Сохранение: и API, и localStorage =====
  const persist = useCallback(async (next: Achievement[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    try {
      setSaving(true);
      await api.saveData(SECTION, next);
      setError(null);
    } catch (e: any) {
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
      await persist(items.map((i) => (i.id === id ? { ...i, ...data } : i)));
    },
    [items, persist]
  );

  const deleteAchievement = useCallback(
    async (id: string) => {
      await persist(items.filter((i) => i.id !== id));
    },
    [items, persist]
  );

  const total = items.length;
  const thisYear = items.filter((i) => {
    const d = new Date(i.date);
    return d.getFullYear() === new Date().getFullYear();
  }).length;

  return {
    items, loading, saving, error, total, thisYear,
    addAchievement, updateAchievement, deleteAchievement,
  };
}
