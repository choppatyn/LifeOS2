import { useEffect, useState, useCallback } from 'react';

export interface ProfileData {
  id?: string;
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

const DEFAULT_PROFILE: ProfileData = {
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

const STORAGE_KEY = 'lifeos.profile';
const API_URL = import.meta.env.VITE_API_URL || '/api';

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/profile`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data) {
            setProfile({ ...DEFAULT_PROFILE, ...data });
            return;
          }
        }
      } catch {
        // игнорируем — уйдём в localStorage
      }

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && !cancelled) {
        try {
          setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
        } catch {}
      }
      if (!cancelled) setLoading(false);
    }

    load().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const saveProfile = useCallback(
    async (next: Partial<ProfileData>) => {
      setSaving(true);
      setError(null);

      const merged: ProfileData = { ...profile, ...next };
      setProfile(merged);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

      try {
        await fetch(`${API_URL}/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(merged),
        });
      } catch {
        setError('Сохранено локально — сервер недоступен');
      } finally {
        setSaving(false);
      }
    },
    [profile]
  );

  const isFilled = Boolean(profile.fullName && profile.birthDate);

  return { profile, loading, saving, error, saveProfile, isFilled };
}
