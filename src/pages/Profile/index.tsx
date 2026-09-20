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
        <div className="flex items-center justify-center py-20 text-muted">
          Загрузка профиля...
        </div>
      </div>
    );
  }

  // Если профиль пустой — показываем форму сразу
  const showForm = editing || !isFilled;

  const age = calcAge(profile.birthDate);

  const infoItems: InfoItem[] = [
    { icon: '🎂', label: 'Возраст', value: age ? `${age} лет` : '—' },
    { icon: '🌐', label: 'Гражданство при рождении', value: profile.birthCitizenship || '—' },
    {
      icon: '📘',
      label: 'Действующие гражданства',
      value: profile.currentCitizenships || '—',
      link: '/profile/documents',
    },
    { icon: '📍', label: 'Город', value: profile.city || '—' },
    { icon: '💼', label: 'Деятельность', value: profile.occupation || '—' },
  ];

  const handleSave = (data: Partial<ProfileData>) => {
    saveProfile(data);
    setEditing(false);
  };

  return (
    <div className="container min-h-screen bg-[#0a0808] text-[#e8e0d8] pb-20">
      {/* Шапка профиля */}
      <ProfileHeader
        fullName={profile.fullName}
        level={24}
        energy={86}
        health={92}
      />

      {showForm ? (
        <ProfileInfoForm
          initial={profile}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
          saving={saving}
        />
      ) : (
        <>
          {/* Основная информация (слева иконка + подпись, справа значение) */}
          <ProfileInfoList sectionTitle="Основная информация" items={infoItems} />

          {/* Идея жизни */}
          <div className="card mt-3">
            <div className="text-xs text-muted uppercase tracking-wider mb-1">
              Ключевая идея
            </div>
            <div className="text-base font-semibold text-[#c9a84c]">
              {profile.lifeIdea || '—'}
            </div>
          </div>

          {/* Мечта */}
          <div className="card mt-3">
            <div className="text-xs text-muted uppercase tracking-wider mb-1">
              Ключевая мечта
            </div>
            <div className="text-base font-medium text-[#e8e0d8]">
              {profile.lifeDream || '—'}
            </div>
          </div>

          {/* Семейное положение и статус */}
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

          {/* Редактировать */}
          <button
            onClick={() => setEditing(true)}
            className="btn-outline-gold w-full mt-3"
          >
            ✏️ Редактировать профиль
          </button>

          {/* Перейти в подразделы */}
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
