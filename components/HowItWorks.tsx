import React from 'react';

// The Step component now becomes a card
const Step: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/80 text-center md:text-left h-full">
    <div className="flex items-center justify-center md:justify-start mb-4">
      <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
        {number}
      </div>
      <h3 className="text-2xl font-semibold text-slate-800 ml-4">{title}</h3>
    </div>
    <p className="text-slate-700 text-lg leading-relaxed">{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* The outer container no longer has a white background */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            3 Langkah Mudah Menuju Anda yang Lebih Sehat
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
            <Step
              number="1"
              title="Input Data Anda"
              description="Masukkan bahan-bahan yang Anda miliki di dapur dan lengkapi profil kesehatan Anda untuk personalisasi maksimal."
            />
            <Step
              number="2"
              title="Dapatkan Saran AI"
              description="Sistem cerdas kami akan menganalisis data Anda dan memberikan rekomendasi resep yang paling sesuai."
            />
            <Step
              number="3"
              title="Masak & Nikmati"
              description="Ikuti panduan resep yang mudah dan nikmati hidangan lezat yang dirancang khusus untuk kesehatan Anda."
            />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
