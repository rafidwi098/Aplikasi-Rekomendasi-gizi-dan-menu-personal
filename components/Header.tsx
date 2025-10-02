import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, isLoggedIn, onLogout }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navLinks = [
    { name: 'Resep Trending', id: 'resep', icon: <img src="https://i.imgur.com/0x7chcL.png" alt="Ikon Resep Trending" /> },
    { name: 'Rekomendasi', id: 'rekomendasi', icon: <img src="https://i.imgur.com/kQuhO0e.png" alt="Ikon Rekomendasi" /> },
    { name: 'Analisis Nutrisi', id: 'analisis', icon: <img src="https://i.imgur.com/oRwMknM.png" alt="Ikon Analisis Nutrisi" /> },
    { name: 'Konsultasi', id: 'konsultasi', icon: <img src="https://i.imgur.com/locKKQE.png" alt="Ikon Konsultasi" /> },
    { name: 'Profil', id: 'profil', icon: <img src="https://i.imgur.com/JeeuIBd.png" alt="Ikon Profil" /> },
    { name: 'Setting', id: 'setting', icon: <img src="https://i.imgur.com/K4Ow5fL.png" alt="Ikon Setting" /> }
  ];
  
  const handleNavClick = (page: string) => {
    onNavigate(page);
  }
  
  const handleLogoutAndClose = () => {
    onLogout();
    setIsAuthModalOpen(false);
  };


  return (
    <>
      <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-slate-800">
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="transition-colors hover:text-emerald-600">NutriAI</a>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const iconSizeClass = (link.id === 'profil' || link.id === 'setting')
                  ? 'h-10 w-10 object-contain' // Reduced size
                  : 'h-12 w-12 object-contain'; // Original size

                return (
                  <a 
                    key={link.id} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                    className={`flex items-center gap-3 text-base transition-colors duration-300 pb-2 border-b-2 ${currentPage === link.id ? 'text-slate-900 font-semibold border-emerald-500' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}
                  >
                    {React.cloneElement(link.icon, { className: iconSizeClass })}
                    <span>{link.name}</span>
                  </a>
                )
              })}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={onLogout}
                  className="bg-slate-100 text-slate-700 px-5 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-base font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onNavigate('register')}
                    className="bg-emerald-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300"
                  >
                    Daftar
                  </button>
                </>
              )}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="md:hidden">
              {isLoggedIn ? (
                <button onClick={() => setIsAuthModalOpen(true)} aria-label="Buka menu profil">
                  <img src="https://i.imgur.com/K4Ow5fL.png" alt="Ikon Setting" className="h-9 w-9 object-contain" />
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors px-3 py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => onNavigate('register')}
                    className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 text-sm"
                  >
                    Daftar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal (Mobile) */}
      {isAuthModalOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4 animate-fadeInUp" 
          style={{ animationDuration: '0.3s' }}
          onClick={() => setIsAuthModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Akun Anda</h2>
              <button onClick={() => setIsAuthModalOpen(false)} className="text-slate-500 hover:text-slate-800 p-1">
                <CloseIcon />
              </button>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleLogoutAndClose}
                className="w-full bg-slate-100 text-slate-700 px-5 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;