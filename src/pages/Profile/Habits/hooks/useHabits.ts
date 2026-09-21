import { useEffect, useState, useCallback } from 'react';
import { api } from '../../../../hooks/useApi';

export interface Habit {
  id: string;
  name: string;
  streak: number;
  progress: number;
}

const SECTION = 'habits';
const STORAGE_KEY = 'lifeos.habits';

export function useHabits() {
  const [items, setItems] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== Загрузка: сначала API, потом localStorage =====
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
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

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && !cancelled) {
        try { setItems(JSON.parse(raw)); } catch {}
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // ===== Сохранение: и в API, и в localStorage (fallback) =====
  const persist = useCallback(async (next: Habit[]) => {
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

  const addHabit = useCallback(
    async (data: Omit<Habit, 'id'>) => {
      const item: Habit = { ...data, id: Date.now().toString() };
      await persist([item, ...items]);
      return item;
    },
    [items, persist]
  );

  const updateHabit = useCallback(
    async (id: string, data: Partial<Habit>) => {
      await persist(items.map((i) => (i.id === id ? { ...i, ...data } : i)));
    },
    [items, persist]
  );

  const deleteHabit = useCallback(
    async (id: string) => {
      await persist(items.filter((i) => i.id !== id));
    },
    [items, persist]
  );

  return {
    items,
    loading,
    saving,
    error,
    addHabit,
    updateHabit,
    deleteHabit,
  };
}
