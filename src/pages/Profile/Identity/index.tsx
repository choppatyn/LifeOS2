import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingAddButton } from '../../../components/ui/FloatingAddButton';

interface Identity {
  whoAmI: string;
  values: string;
  principles: string;
  strengths: string;
  weaknesses: string;
  futureSelf: string;
}

const STORAGE_KEY = 'lifeos.identity';

const EMPTY: Identity = {
  whoAmI: '',
  values: '',
  principles: '',
  strengths: '',
  weaknesses: '',
  futureSelf: '',
};

const IdentityPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Identity>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Identity>(EMPTY);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setData(JSON.parse(raw)); } catch {}
    }
  }, []);

  const openEdit = () => {
    setForm(data);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    setData(form);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setShowForm(false);
  };

  const rows: { key: keyof Identity; label: string }[] = [
    { key: 'whoAmI', label: 'Кто я
