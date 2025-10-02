import React from 'react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-200/80 group">
    <div className="bg-emerald-50 text-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-700 text-base leading-relaxed">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <img src="https://i.imgur.com/kQuhO0e.png" alt="Ikon Rekomendasi Cerdas" className="h-16 w-16 object-contain" />,
      title: 'Rekomendasi Cerdas',
      description: 'Beritahu kami bahan apa yang Anda miliki, dan AI kami akan sarankan resep lezat yang disesuaikan untuk Anda.',
    },
    {
      icon: <img src="https://i.imgur.com/w4bXRmD.png" alt="Ikon Fokus pada Kesehatan" className="h-16 w-16 object-contain" />,
      title: 'Fokus pada Kesehatan',
      description: 'Integrasikan riwayat kesehatan Anda untuk menerima resep yang mendukung perjalanan kebugaran Anda.',
    },
    {
      icon: <img src="https://i.imgur.com/rlXA5fr.png" alt="Ikon Database Resep" className="h-16 w-16 object-contain" />,
      title: 'Database Resep Lengkap',
      description: 'Jelajahi ratusan resep bergizi, lengkap dengan informasi nutrisi terperinci untuk setiap hidangan.',
    },
    {
      icon: <img src="https://i.imgur.com/oRwMknM.png" alt="Ikon Analisis Nutrisi" className="h-16 w-16 object-contain" />,
      title: 'Analisis Nutrisi Instan',
      description: 'Masukkan makanan apa pun untuk mendapatkan analisis gizi cepat, ringkasan kesehatan, dan saran perbaikan yang optimal untuk Anda.',
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Fitur Unggulan Kami
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;