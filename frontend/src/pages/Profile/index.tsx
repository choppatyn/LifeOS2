import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile, ProfileData } from './hooks/useProfile';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileInfoList, InfoItem } from './components/ProfileInfoList';
import { ProfileInfoForm } from './components/ProfileInfoForm';
import { calcAge } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, loading, saving, saveProfile, isFilled } = useProfile();

  const [editing, setEditing] = useState(false);

  if (loading) {
    return (
      <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
        {/* Заголовок страницы — даже во время загрузки */}
        <div className="flex items-center gap-3 mb-4 pt-2">
          <span className="text-lg text-muted">👤</span>
          <h2 className="text-sm font-semibold tracking-[0.25em] text-[#c9a84c] uppercase">
            Профиль
          </h2>
        </div>
        <div className="flex items-center justify-center py-20 text-muted">
          Загрузка профиля…
        </div>
      </div>
    );
  }

  const showForm = editing || !isFilled;
  const age = calcAge(profile.birthDate);

  const infoItems: InfoItem[] = [
    { icon: '🎂', label: 'Возраст', value: age ? `${age} лет` : '—' },
    {
      icon: '🌐',
      label: 'Гражданство при рождении',
      value: profile.birthCitizenship || '—',
    },
    {
      icon: '📘',
      label: 'Действующие гражданства',
      value: profile.currentCitizenships || '—',
      link: '/profile/documents',
    },
    { icon: '📍', label: 'Город', value: profile.city || '—' },
    {
      icon: '💼',
      label: 'Деятельность',
      value: profile.occupation || '—',
    },
  ];

  const handleSave = (data: Partial<ProfileData>) => {
    saveProfile(data);
    setEditing(false);
  };

  return (
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
      {/* ==================== ЗАГОЛОВОК СТРАНИЦЫ ==================== */}
      <div className="flex items-center gap-3 mb-4 pt-2">
        <span className="text-lg text-muted">👤</span>
        <h2 className="text-sm font-semibold tracking-[0.25em] text-[#c9a84c] uppercase">
          Профиль
        </h2>
      </div>

      {/* ==================== ШАПКА ПРОФИЛЯ ==================== */}
      <ProfileHeader
        fullName={profile.fullName}
        level={24}
        energy={86}
        health={92}
      />

      {showForm ? (
        // ================== ЭКРАН 2: РЕДАКТИРОВАНИЕ ==================
        <ProfileInfoForm
          initial={profile}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          saving={saving}
        />
      ) : (
        // ================== ЭКРАН 1: ПРОСМОТР ==================
        <>
          {/* Основная информация */}
          <ProfileInfoList
            sectionTitle="Основная информация"
            items={infoItems}
          />

          {/* Ключевая идея */}
          <div className="card mt-3">
            <div className="text-xs text-muted uppercase tracking-wider mb-1">
              Ключевая идея
            </div>
            <div className="text-base font-semibold text-[#c9a84c]">
              {profile.lifeIdea || '—'}
            </div>
          </div>

          {/* Ключевая мечта */}
          <div className="card mt-3">
            <div className="text-xs text-muted uppercase tracking-wider mb-1">
              Ключевая мечта
            </div>
            <div className="text-base font-medium text-[#e8e0d8]">
              {profile.lifeDream || '—'}
            </div>
          </div>

          {/* Семейное положение + Статус */}
          <div className="mt-3">
            <ProfileInfoList
              items={[
                {
                  icon: '💍',
                  label: 'Семейное положение',
                  value: profile.maritalStatus || '—',
                  link: '/profile/relationships',
                },
                {
                  icon: '🚀',
                  label: 'Статус',
                  value: profile.status || '—',
                },
              ]}
            />
          </div>

          {/* Кнопка «Редактировать профиль» */}
          <button
            onClick={() => setEditing(true)}
            className="btn-outline-gold w-full mt-3"
          >
            ✏️ Редактировать профиль
          </button>

          {/* Кнопка «Перейти в подразделы» */}
          <Button
            variant="gold"
            fullWidth
            className="mt-3"
            onClick={() => navigate('/profile/subsections')}
          >
            Перейти в подразделы →
          </Button>
        </>
      )}
    </div>
  );
};

export default Profile;
