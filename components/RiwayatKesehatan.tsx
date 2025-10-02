import React, { useState, useEffect } from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { TargetIcon } from './icons/TargetIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { HealthProfile } from '../App';

// Fix: Add props interface to accept currentProfile and onUpdateProfile
interface ProfilPageProps {
  currentProfile: HealthProfile;
  onUpdateProfile: (newProfile: HealthProfile) => void;
}

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center mb-6">
    <span className="text-emerald-500">{icon}</span>
    <h2 className="text-2xl font-bold text-slate-800 ml-3">{title}</h2>
  </div>
);

// Fix: Update component signature to accept props
const ProfilPage: React.FC<ProfilPageProps> = ({ currentProfile, onUpdateProfile }) => {
  // Fix: Initialize state from props to make it a controlled component
  const [formData, setFormData] = useState<HealthProfile>(currentProfile);
  const [isSaving, setIsSaving] = useState(false);

  // Fix: Add useEffect to sync local state when prop changes
  useEffect(() => {
    setFormData(currentProfile);
  }, [currentProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => {
      const newConditions = checked
        ? [...prev.conditions, name]
        : prev.conditions.filter(c => c !== name);
      return { ...prev, conditions: newConditions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Fix: Call onUpdateProfile to lift state up to the parent component
      onUpdateProfile(formData);
    }, 1500);
  };

  const medicalConditions = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hipertensi', label: 'Hipertensi' },
    { id: 'kolesterol', label: 'Kolesterol Tinggi' },
    { id: 'asam-urat', label: 'Asam Urat' },
    { id: 'maag', label: 'Penyakit Maag' },
  ];

  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Profil Anda
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            Lengkapi data di bawah ini agar kami dapat memberikan rekomendasi resep yang paling sesuai untuk Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200">
          {/* Data Pribadi */}
          <div className="mb-12">
            <SectionHeader icon={<UserCircleIcon />} title="Data Pribadi" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-slate-700 mb-1">Nama</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="form-input" />
              </div>
              <div>
                <label htmlFor="age" className="block text-base font-semibold text-slate-700 mb-1">Usia (tahun)</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} className="form-input" />
              </div>
              <div>
                <label htmlFor="weight" className="block text-base font-semibold text-slate-700 mb-1">Berat Badan (kg)</label>
                <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} className="form-input" />
              </div>
              <div>
                <label htmlFor="height" className="block text-base font-semibold text-slate-700 mb-1">Tinggi Badan (cm)</label>
                <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} className="form-input" />
              </div>
            </div>
          </div>

          {/* Tujuan Kesehatan */}
          <div className="mb-12">
            <SectionHeader icon={<TargetIcon />} title="Tujuan Kesehatan" />
            <div>
              <label htmlFor="goal" className="block text-base font-semibold text-slate-700 mb-1">Apa tujuan utama Anda?</label>
              <select id="goal" name="goal" value={formData.goal} onChange={handleInputChange} className="form-input">
                <option value="lose-weight">Menurunkan Berat Badan</option>
                <option value="maintain-weight">Menjaga Berat Badan</option>
                <option value="gain-muscle">Membangun Otot</option>
                <option value="manage-diabetes">Mengelola Gula Darah</option>
              </select>
            </div>
          </div>

          {/* Kondisi Medis */}
          <div className="mb-12">
            <SectionHeader icon={<ClipboardCheckIcon />} title="Kondisi & Preferensi" />
            <div className="space-y-6">
              <div>
                <label className="block text-base font-semibold text-slate-700 mb-3">Pilih kondisi medis yang Anda miliki (jika ada):</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {medicalConditions.map(condition => (
                    <label 
                      key={condition.id} 
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                        formData.conditions.includes(condition.id)
                          ? 'bg-emerald-50 border-emerald-400'
                          : 'border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        name={condition.id}
                        checked={formData.conditions.includes(condition.id)}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 rounded border-slate-400 accent-emerald-600 focus:ring-emerald-500"
                      />
                      <span className={
                        formData.conditions.includes(condition.id) 
                          ? 'font-semibold text-emerald-900' 
                          : 'text-slate-700'
                      }>
                        {condition.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="allergies" className="block text-base font-semibold text-slate-700 mb-1">Alergi Makanan (pisahkan dengan koma)</label>
                <input type="text" id="allergies" name="allergies" value={formData.allergies} onChange={handleInputChange} className="form-input" />
              </div>
               <div>
                <label htmlFor="diet" className="block text-base font-semibold text-slate-700 mb-1">Preferensi Diet</label>
                <select id="diet" name="diet" value={formData.diet} onChange={handleInputChange} className="form-input">
                  <option value="seimbang">Diet Seimbang</option>
                  <option value="rendah-garam">Rendah Garam</option>
                  <option value="rendah-gula">Rendah Gula</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-slate-200 pt-6">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-emerald-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-md disabled:bg-slate-400 disabled:cursor-wait"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
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

export default ProfilPage;