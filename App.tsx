import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Recipes from './components/Recipes';
import Rekomendasi from './components/Rekomendasi';
import ProfilPage from './components/RiwayatKesehatan'; // Renamed RiwayatKesehatan to ProfilPage
import SettingsPage from './components/Profil'; // Renamed Profil to SettingsPage
import AnalisisNutrisi from './components/AnalisisNutrisi';
import Konsultasi from './components/Konsultasi';
import TrendingRecipesPreview from './components/TrendingRecipesPreview';
import BottomNav from './components/BottomNav';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

export interface HealthProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: string;
  goal: string;
  conditions: string[];
  allergies: string;
  diet: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [healthProfile, setHealthProfile] = useState<HealthProfile>({
    name: 'Pengguna',
    age: 30,
    weight: 70,
    height: 175,
    gender: 'Pria',
    goal: 'maintain-weight',
    conditions: ['diabetes'],
    allergies: 'Tidak ada',
    diet: 'rendah-gula',
  });

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleUpdateHealthProfile = (newProfile: HealthProfile) => {
    setHealthProfile(newProfile);
     alert('Profil kesehatan berhasil diperbarui!');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigateTo('home'); // Navigate to home dashboard after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('home'); // Navigate home after logout
  };

  return (
    <div className="text-slate-800 pb-20 md:pb-0">
      <Header 
        currentPage={currentPage} 
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} />
            <Features />
            <TrendingRecipesPreview onNavigate={navigateTo} />
            <HowItWorks />
          </>
        )}
        {currentPage === 'resep' && <Recipes />}
        {currentPage === 'rekomendasi' && <Rekomendasi healthProfile={healthProfile} />}
        {currentPage === 'profil' && <ProfilPage currentProfile={healthProfile} onUpdateProfile={handleUpdateHealthProfile} />}
        {currentPage === 'setting' && <SettingsPage />}
        {currentPage === 'analisis' && <AnalisisNutrisi />}
        {currentPage === 'konsultasi' && <Konsultasi />}
        {currentPage === 'login' && <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />}
        {currentPage === 'register' && <RegisterPage onNavigate={navigateTo} />}
      </main>
      <Footer />
      {!['login', 'register'].includes(currentPage) && (
        <BottomNav currentPage={currentPage} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;