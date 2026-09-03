import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../hooks/useApi';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';

interface ProfileData {
  fullName: string;
  age: number;
  birthCitizenship: string;
  currentCitizenships: string[];
  city: string;
  occupation: string;
  lifeIdea: string;
  lifeDream: string;
  maritalStatus: string;
  status: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/profile').then(data => {
      setProfile(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-center text-muted">Загрузка...</div>;
  if (!profile) return <div className="p-4 text-center text-muted">Профиль не найден</div>;

  const subsections = [
    { id: 'achievements', label: 'Достижения', icon: '🏆' },
    { id: 'relationships', label: 'Личные отношения', icon: '💕' },
    { id: 'habits', label: 'Привычки', icon: '🔄' },
    { id: 'lifepath', label: 'Жизненный путь', icon: '📜' },
    { id: 'travels', label: 'Путешествия', icon: '🌍' },
    { id: 'career', label: 'Карьера', icon: '💼' },
    { id: 'documents', label: 'Личные документы', icon: '📄' },
    { id: 'identity', label: 'Идентичность', icon: '🧘' },
  ];

  return (
    <div className="container max-w-md mx-auto px-4 py-4 space-y-4">
      {/* Шапка */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="lg" src={null} name={profile.fullName} />
          <div>
            <h1 className="text-xl font-bold">{profile.fullName}</h1>
            <div className="flex items-center gap-2 text-sm text-muted">
              <span>Уровень 28</span>
              <span>•</span>
              <span>Опыт: 12 450 / 18 000</span>
            </div>
          </div>
        </div>
      </div>

      <ProgressBar value={70} label="Опыт" showValue />

      {/* Информация */}
      <Card>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-muted">Возраст</span><br />{profile.age} лет</div>
          <div><span className="text-muted">Гражданство</span><br />{profile.birthCitizenship}</div>
          <div><span className="text-muted">Город</span><br />{profile.city}</div>
          <div><span className="text-muted">Деятельность</span><br />{profile.occupation}</div>
          <div className="col-span-2"><span className="text-muted">Идея жизни</span><br />{profile.lifeIdea}</div>
          <div className="col-span-2"><span className="text-muted">Мечта</span><br />{profile.lifeDream}</div>
          <div><span className="text-muted">Семейное положение</span><br />{profile.maritalStatus}</div>
          <div><span className="text-muted">Статус</span><br />{profile.status}</div>
        </div>
      </Card>

      {/* Подразделы */}
      <Button variant="gold" fullWidth onClick={() => {}}>
        Перейти в подразделы →
      </Button>

      <div className="grid grid-cols-2 gap-2 mt-2">
        {subsections.map((sub) => (
          <button
            key={sub.id}
            onClick={() => navigate(`/profile/${sub.id}`)}
            className="bg-[#1a1515] border border-[#2a2323] rounded-xl p-3 text-center hover:border-[#c9a84c] transition-all"
          >
            <div className="text-2xl">{sub.icon}</div>
            <div className="text-xs text-muted mt-1">{sub.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Profile;
