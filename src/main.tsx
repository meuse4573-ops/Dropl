import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage onNavigate={(view) => {
          if (view === 'login') window.location.href = '/login';
          if (view === 'signup') window.location.href = '/signup';
        }} />} />
        <Route path="/login" element={<Auth initialMode="login" onBack={() => window.location.href = '/'} />} />
        <Route path="/signup" element={<Auth initialMode="signup" onBack={() => window.location.href = '/'} />} />
        <Route path="/dashboard" element={<App.Dashboard onLogout={() => window.location.href = '/'} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
