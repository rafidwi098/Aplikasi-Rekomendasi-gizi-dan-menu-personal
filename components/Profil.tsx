import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { LanguageIcon } from './icons/LanguageIcon';
import { ThemeIcon } from './icons/ThemeIcon';
import { BellIcon } from './icons/BellIcon';
import { LockIcon } from './icons/LockIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

// --- Ikon baru yang didefinisikan di dalam file ---
const LinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);
const DatabaseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7a8 8 0 0116 0" />
    </svg>
);
const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const RightArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);
// --- End of new icons ---

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center mb-6">
            <span className="text-emerald-500">{icon}</span>
            <h2 className="text-xl font-bold text-slate-800 ml-3">{title}</h2>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const ToggleSwitch: React.FC<{ id: string; label: string; enabled: boolean; onChange: (enabled: boolean) => void }> = ({ id, label, enabled, onChange }) => (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer">
        <span className="text-slate-700 text-base">{label}</span>
        <div className="relative">
            <input id={id} type="checkbox" className="sr-only" checked={enabled} onChange={e => onChange(e.target.checked)} />
            <div className={`block w-14 h-8 rounded-full transition-colors ${enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'transform translate-x-6' : ''}`}></div>
        </div>
    </label>
);

const SettingsPage: React.FC = () => {
    const [settings, setSettings] = useState({
        name: 'Pengguna Setia',
        email: 'pengguna@nutriai.com',
        phone: '+62 812 3456 7890',
        language: 'id',
        theme: 'system',
        notifications: {
            recommendations: true,
            updates: false,
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
         const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleThemeChange = (theme: string) => {
        setSettings(prev => ({ ...prev, theme }));
    };
    
    const handleNotificationChange = (key: keyof typeof settings.notifications, value: boolean) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: value
            }
        }));
    };
    
    const handleSaveChanges = () => {
        alert("Pengaturan berhasil disimpan!");
        console.log("Saving settings:", settings);
    };

    return (
        <section className="py-16 md:py-24 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
                        Pengaturan
                    </h1>
                    <p className="text-lg text-slate-700 leading-relaxed">
                        Kelola informasi akun, preferensi, dan keamanan Anda di satu tempat.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Account Settings */}
                    <SectionCard title="Pengaturan Akun" icon={<UserIcon />}>
                        <div>
                            <label htmlFor="name" className="block text-base font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                            <input type="text" id="name" name="name" value={settings.name} onChange={handleInputChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-base font-semibold text-slate-700 mb-1">Alamat Email</label>
                            <input type="email" id="email" name="email" value={settings.email} onChange={handleInputChange} className="form-input" />
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-base font-semibold text-slate-700 mb-1">Nomor Telepon</label>
                            <input type="tel" id="phone" name="phone" value={settings.phone} onChange={handleInputChange} className="form-input" />
                        </div>
                    </SectionCard>

                    {/* Integrations */}
                    <SectionCard title="Integrasi Aplikasi" icon={<LinkIcon />}>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <img src="https://www.google.com/fit/static/images/Fit_icon_RGB.svg" alt="Google Fit" className="h-8 w-8" />
                                <span className="font-semibold text-slate-700">Google Fit</span>
                            </div>
                            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Hubungkan</button>
                        </div>
                         <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                 <img src="https://developer.apple.com/assets/elements/icons/healthkit/healthkit-96x96.png" alt="Apple Health" className="h-8 w-8" />
                                <span className="font-semibold text-slate-700">Apple Health</span>
                            </div>
                            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Hubungkan</button>
                        </div>
                    </SectionCard>

                    {/* Data Management */}
                    <SectionCard title="Kelola Data" icon={<DatabaseIcon />}>
                         <button className="w-full text-left bg-slate-100 text-slate-700 px-5 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors duration-200">
                            Ekspor Data Saya
                        </button>
                         <button className="w-full text-left bg-red-50 text-red-700 px-5 py-3 rounded-lg font-semibold hover:bg-red-100 transition-colors duration-200">
                            Hapus Akun Saya
                        </button>
                    </SectionCard>

                    {/* App Settings (Existing) */}
                    <SectionCard title="Preferensi Bahasa" icon={<LanguageIcon />}>
                        <div className="relative">
                           <label htmlFor="language" className="block text-base font-semibold text-slate-700 mb-1">Bahasa</label>
                           <select name="language" id="language" value={settings.language} onChange={handleSelectChange} className="form-input appearance-none">
                                <option value="id">Bahasa Indonesia</option>
                                <option value="en">English</option>
                           </select>
                           <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-4 text-slate-400">
                               <ChevronDownIcon />
                           </div>
                        </div>
                    </SectionCard>
                    <SectionCard title="Tema Tampilan" icon={<ThemeIcon />}>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {['Sistem', 'Terang', 'Gelap'].map(themeOption => (
                                <button key={themeOption} onClick={() => handleThemeChange(themeOption.toLowerCase())}
                                    className={`px-4 py-3 rounded-lg font-semibold text-center transition-all duration-200 ${ settings.theme === themeOption.toLowerCase() ? 'bg-emerald-500 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200' }`} >
                                    {themeOption}
                                </button>
                            ))}
                        </div>
                    </SectionCard>
                    <SectionCard title="Notifikasi" icon={<BellIcon />}>
                       <ToggleSwitch id="notif-recs" label="Rekomendasi Resep Baru" enabled={settings.notifications.recommendations} onChange={v => handleNotificationChange('recommendations', v)} />
                       <ToggleSwitch id="notif-updates" label="Update Aplikasi" enabled={settings.notifications.updates} onChange={v => handleNotificationChange('updates', v)} />
                    </SectionCard>
                    <SectionCard title="Keamanan" icon={<LockIcon />}>
                        <button className="w-full sm:w-auto text-center bg-slate-100 text-slate-700 px-5 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors duration-200">
                            Ubah Kata Sandi
                        </button>
                    </SectionCard>
                    
                    {/* Help & About */}
                     <SectionCard title="Bantuan & Tentang" icon={<InfoIcon />}>
                        <a href="#" className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg"><span>Pusat Bantuan (FAQ)</span><RightArrowIcon /></a>
                        <a href="#" className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg"><span>Hubungi Dukungan</span><RightArrowIcon /></a>
                        <a href="#" className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg"><span>Kebijakan Privasi</span><RightArrowIcon /></a>
                        <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-200">Versi Aplikasi 1.0.0</div>
                    </SectionCard>


                    <div className="mt-8 pt-6">
                        <button onClick={handleSaveChanges} className="w-full bg-emerald-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-md">
                            Simpan Pengaturan
                        </button>
                    </div>
                </div>
            </div>
             <style>{`
                .form-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background-color: white;
                    color: #1e293b;
                    border: 1px solid #cbd5e1; /* slate-300 */
                    border-radius: 0.5rem;
                    transition: box-shadow 0.2s, border-color 0.2s;
                }
                .form-input:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px #10b981; /* emerald-500 */
                    border-color: #10b981; /* emerald-500 */
                }
            `}</style>
        </section>
    );
};

export default SettingsPage;