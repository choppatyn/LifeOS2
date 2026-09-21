import { useEffect, useState, useCallback } from 'react';
import { api } from '../../../hooks/useApi';

export interface ProfileData {
  fullName: string;
  birthDate: string;
  birthCitizenship: string;
  currentCitizenships: string;
  city: string;
  occupation: string;
  lifeIdea: string;
  lifeDream: string;
  maritalStatus: string;
  status: string;
}

const SECTION = 'profile';
const STORAGE_KEY = 'lifeos.profile';

const EMPTY: ProfileData = {
  fullName: '',
  birthDate: '',
  birthCitizenship: '',
  currentCitizenships: '',
  city: '',
  occupation: '',
  lifeIdea: '',
  lifeDream: '',
  maritalStatus: '',
  status: '',
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== Загрузка: API → fallback localStorage =====
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await api.getData(SECTION);
        if (
          !cancelled &&
          res &&
          res.data &&
          typeof res.data === 'object' &&
          !Array.isArray(res.data)
        ) {
          const merged = { ...EMPTY, ...res.data };
          setProfile(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          setLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Backend unavailable, falling back to localStorage:', e);
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && !cancelled) {
        try { setProfile({ ...EMPTY, ...JSON.parse(raw) }); } catch {}
      }
      if (!cancelled) setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // ===== Сохранение: API + localStorage =====
  const saveProfile = useCallback(
    async (next: Partial<ProfileData>) => {
      const merged: ProfileData = { ...profile, ...next };
      setProfile(merged);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

      try {
        setSaving(true);
        await api.saveData(SECTION, merged);
        setError(null);
      } catch {
        setError('Сохранено локально — сервер недоступен');
      } finally {
        setSaving(false);
      }
    },
    [profile]
  );

  return {
    profile,
    loading,
    saving,
    error,
    saveProfile,
    isFilled: Boolean(profile.fullName),
  };
}
