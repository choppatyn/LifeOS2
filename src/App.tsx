import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

// Страницы
import Profile from './pages/Profile';
import Characteristics from './pages/Characteristics';
import Skills from './pages/Skills';
import Society from './pages/Society';
import More from './pages/More';
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
          <Route path="profile" element={<Profile />} />
          <Route path="characteristics" element={<Characteristics />} />
          <Route path="skills" element={<Skills />} />
          <Route path="society" element={<Society />} />
          <Route path="more" element={<More />} />
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
