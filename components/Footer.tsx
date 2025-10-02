import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t-2 border-emerald-500">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">NutriAI</h3>
            <p className="text-slate-300">Rekomendasi resep sehat personal Anda.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Menu</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Resep</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Rekomendasi</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Analisis Nutrisi</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Profil</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Setting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Kontak</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Ikuti Kami</h4>
            {/* Replace with actual social icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M..."></path></svg>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M..."></path></svg>
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M..."></path></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} NutriAI. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;