import React from 'react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const NavCard: React.FC<{
  iconUrl: string;
  title: string;
  onClick: () => void;
}> = ({ iconUrl, title, onClick }) => (
  <div 
    onClick={onClick} 
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200/80 group cursor-pointer text-center flex flex-col items-center justify-center"
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && onClick()}
  >
    <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-110">
      <img src={iconUrl} alt={`${title} icon`} className="h-12 w-12 object-contain" />
    </div>
    <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
  </div>
);


const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <>
      {/* Mobile View: Dashboard Cards */}
      <section className="py-16 md:hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto items-stretch">
            <NavCard 
              onClick={() => onNavigate('resep')}
              iconUrl="https://i.imgur.com/0x7chcL.png"
              title="Resep Trending"
            />
            <NavCard 
              onClick={() => onNavigate('rekomendasi')}
              iconUrl="https://i.imgur.com/kQuhO0e.png"
              title="Rekomendasi AI"
            />
            <NavCard 
              onClick={() => onNavigate('analisis')}
              iconUrl="https://i.imgur.com/oRwMknM.png"
              title="Analisis Nutrisi"
            />
            <NavCard 
              onClick={() => onNavigate('konsultasi')}
              iconUrl="https://i.imgur.com/locKKQE.png"
              title="Konsultasi Ahli Gizi"
            />
          </div>
        </div>
      </section>

      {/* Desktop View: Original Hero */}
      <section className="hidden md:block py-32 md:py-48 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-slate-800/20 backdrop-blur-sm p-12 rounded-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeInUp" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
              Makan Sehat, Dibuat Mudah
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s', textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
              Dapatkan rekomendasi resep personal berdasarkan bahan, tujuan kesehatan, dan riwayat medis Anda.
            </p>
            <button
              onClick={() => onNavigate('rekomendasi')}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-xl transform hover:scale-105 active:scale-95 animate-fadeInUp"
              style={{ animationDelay: '0.4s' }}
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;