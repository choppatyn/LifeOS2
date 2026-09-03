import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

// Страницы
import Profile from './pages/Profile';
import ProfileAchievements from './pages/Profile/Achievements';
import ProfileRelationships from './pages/Profile/Relationships';
import ProfileHabits from './pages/Profile/Habits';
import ProfileLifePath from './pages/Profile/LifePath';
import ProfileTravels from './pages/Profile/Travels';
import ProfileCareer from './pages/Profile/Career';
import ProfileDocuments from './pages/Profile/Documents';
import ProfileIdentity from './pages/Profile/Identity';

import Characteristics from './pages/Characteristics';
import Skills from './pages/Skills';
import Society from './pages/Society';
import Inventory from './pages/Inventory';
import Goals from './pages/Goals';
import Assets from './pages/Assets';
import Balance from './pages/Balance';
import Journal from './pages/Journal';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Profile />} />
          
          {/* Профиль и подразделы */}
          <Route path="profile" element={<Profile />} />
          <Route path="profile/achievements" element={<ProfileAchievements />} />
          <Route path="profile/relationships" element={<ProfileRelationships />} />
          <Route path="profile/habits" element={<ProfileHabits />} />
          <Route path="profile/lifepath" element={<ProfileLifePath />} />
          <Route path="profile/travels" element={<ProfileTravels />} />
          <Route path="profile/career" element={<ProfileCareer />} />
          <Route path="profile/documents" element={<ProfileDocuments />} />
          <Route path="profile/identity" element={<ProfileIdentity />} />
          
          <Route path="characteristics" element={<Characteristics />} />
          <Route path="skills" element={<Skills />} />
          <Route path="society" element={<Society />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="goals" element={<Goals />} />
          <Route path="assets" element={<Assets />} />
          <Route path="balance" element={<Balance />} />
          <Route path="journal" element={<Journal />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
