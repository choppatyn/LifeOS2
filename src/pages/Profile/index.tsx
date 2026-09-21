import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile, ProfileData } from './hooks/useProfile';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileInfoList, InfoItem } from './components/ProfileInfoList';
import { ProfileInfoForm } from './components/ProfileInfoForm';
import { calcAge } from '../../lib/utils';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, loading, saving, saveProfile, isFilled } = useProfile();
  const [editing, setEditing] = useState(false);

  if (loading) {
    return (
      <div className="container min-h-screen pb-20">
        <div className="text-center text-muted py-20">Загрузка профиля…</div>
      </div>
    );
  }

  const showForm = editing || !isFilled;
  const age = calcAge(profile.birthDate);

  const infoItems: InfoItem[] = [
    { icon: '🎂', label: 'Возраст', value: age ? `${age} лет` : '—' },
    { icon: '🌐', label: 'Гражданство при рождении', value: profile.birthCitizenship || '—' },
    { icon: '📘', label: 'Действующие гражданства', value: profile.currentCitizenships || '—', link: '/profile/documents' },
    { icon: '📍', label: 'Город', value: profile.city || '—' },
    { icon: '💼', label: 'Деятельность', value: profile.occupation || '—' },
  ];

  const handleSave = (data: Partial<ProfileData>) => {
    saveProfile(data);
    setEditing(false);
  };

  return (
    <div className="container min-h-screen pb-20">
      <div className="flex items-center gap-3 mb-4 pt-2">
        <span className="text-lg text-muted">👤</span>
        <h2 className="text-sm font-semibold tracking-[0.25em] text-[#c9a84c] uppercase">
          Профиль
        </h2>
      </div>

      <ProfileHeader fullName={profile.fullName} level={24} energy={86} health={92} />

      {showForm ? (
        <ProfileInfoForm
          initial={profile}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          saving={saving}
        />
      ) : (
        <>
          <ProfileInfoList sectionTitle="Основная информация" items={infoItems} />

          <div
            className="rounded-2xl px-4 py-3 mt-3"
            style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
          >
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Ключевая идея</div>
            <div className="text-base font-semibold text-[#c9a84c]">{profile.lifeIdea || '—'}</div>
          </div>

          <div
            className="rounded-2xl px-4 py-3 mt-3"
            style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
          >
            <div className="text-xs text-muted uppercase tracking-wider mb-1">Ключевая мечта</div>
            <div className="text-base font-medium">{profile.lifeDream || '—'}</div>
          </div>

          <div className="mt-3">
            <ProfileInfoList
              items={[
                { icon: '💍', label: 'Семейное положение', value: profile.maritalStatus || '—', link: '/profile/relationships' },
                { icon: '🚀', label: 'Статус', value: profile.status || '—' },
              ]}
            />
          </div>

         <button
  onClick={() => setEditing(true)}
  className="btn-wide btn-wide-outline mt-3"
>
  ✏️ Редактировать профиль
</button>

<button
  onClick={() => navigate('/profile/subsections')}
  className="btn-wide btn-wide-gold mt-3"
>
  Перейти в подразделы →
</button>
        </>
      )}
    </div>
  );
};

export default Profile;
