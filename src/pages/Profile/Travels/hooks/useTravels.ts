import { useEffect, useState, useCallback } from 'react';
import { api } from '../../../../hooks/useApi';

export interface Travel {
  id: string;
  country: string;
  city: string;
  date: string;
  days: string;
  purpose: string;
}

const SECTION = 'travels';
const STORAGE_KEY = 'lifeos.travels';

export function useTravels() {
  const [items, setItems] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await api.getData(SECTION);
        if (!cancelled && res && Array.isArray(res.data)) {
          setItems(res.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
          setLoading(false); return;
        }
      } catch (e) { console.warn(e); }
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && !cancelled) { try { setItems(JSON.parse(raw)); } catch {} }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const persist = useCallback(async (next: Travel[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    try { setSaving(true); await api.saveData(SECTION, next); setError
