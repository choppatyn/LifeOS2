import { useEffect, useState, useCallback } from 'react';
import { api } from '../../../../hooks/useApi';

export interface Identity {
  whoAmI: string;
  values: string;
  principles: string;
  strengths: string;
  weaknesses: string;
  futureSelf: string;
}

const SECTION = 'identity';
const STORAGE_KEY = 'lifeos.identity';

const EMPTY: Identity = {
  whoAmI: '',
  values: '',
  principles: '',
  strengths: '',
  weaknesses: '',
  futureSelf: '',
};

export function useIdentity() {
  const [data, setData] = useState<Identity>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await api.getData(SECTION);
        if (!cancelled && res && res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
          setData({ ...EMPTY, ...res.data });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
          setLoading(false);
          return;
        }
      } catch (e) { console.warn(e); }
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && !cancelled) { try { setData({ ...EMPTY, ...JSON.parse(raw) }); } catch {} }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const save = useCallback(async (next: Identity) => {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    try { setSaving(true); await api.saveData(SECTION, next); setError(null); }
    catch { setError('Сохранено локально'); }
    finally { setSaving(false); }
  }, []);

  return { data, loading, saving, error, save };
}
