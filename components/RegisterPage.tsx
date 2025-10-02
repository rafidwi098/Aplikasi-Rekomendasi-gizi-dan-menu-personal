import React, { useState } from 'react';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }
    // In a real app, you'd register the user here
    console.log('Registering with:', name, email, password);
    alert('Pendaftaran berhasil! Silakan masuk.');
    onNavigate('login');
  };

  return (
    <section className="py-20 md:py-32 flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Buat Akun Baru</h1>
            <p className="text-slate-700">Mulai perjalanan sehat Anda bersama NutriAI.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
             <div>
              <label htmlFor="name" className="block text-base font-semibold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Nama Anda"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-semibold text-slate-700 mb-1">Alamat Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="anda@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-base font-semibold text-slate-700 mb-1">Kata Sandi</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Minimal 8 karakter"
                required
              />
            </div>
             <div>
              <label htmlFor="confirmPassword" className="block text-base font-semibold text-slate-700 mb-1">Konfirmasi Kata Sandi</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                placeholder="Ulangi kata sandi"
                required
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-md"
              >
                Daftar
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-base text-slate-700">
              Sudah punya akun?{' '}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </div>
       <style>{`
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: white;
          color: #1e293b;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .form-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px #10b981;
          border-color: #10b981;
        }
      `}</style>
    </section>
  );
};

export default RegisterPage;