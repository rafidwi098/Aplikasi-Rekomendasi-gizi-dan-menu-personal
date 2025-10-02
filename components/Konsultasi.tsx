import React, { useState, useMemo } from 'react';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import { StartChatIcon } from './icons/StartChatIcon';
import ChatModal from './ChatModal'; // Impor komponen chat modal

// Antarmuka untuk mendefinisikan struktur data dokter
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  status: 'Online' | 'Offline' | 'Sibuk';
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

// Data dummy untuk para dokter
const dummyDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Clara Karunia Pandiga, M.Gizi, Sp.G.K',
    specialty: 'Spesialis Gizi Klinis',
    status: 'Online',
    price: 32100,
    rating: 4.9,
    reviews: 1200,
    imageUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Dr. Budi Santoso, Sp.GK',
    specialty: 'Gizi Olahraga & Kebugaran',
    status: 'Sibuk',
    price: 45000,
    rating: 4.8,
    reviews: 980,
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 3,
    name: 'Dr. Anisa Fitriani, M.Sc',
    specialty: 'Gizi Ibu dan Anak',
    status: 'Online',
    price: 35000,
    rating: 4.9,
    reviews: 1500,
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 4,
    name: 'Dr. Farhan Abdullah, Sp.GK',
    specialty: 'Manajemen Berat Badan',
    status: 'Offline',
    price: 30000,
    rating: 4.7,
    reviews: 750,
    imageUrl: 'https://i.pravatar.cc/150?img=12',
  },
];

// Komponen Kartu Dokter
const DoctorCard: React.FC<{ doctor: Doctor, onStartChat: (doctor: Doctor) => void }> = ({ doctor, onStartChat }) => {
  const statusStyles = {
    Online: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    Offline: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
    Sibuk: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
  };
  const currentStatus = statusStyles[doctor.status];

  return (
    <div className="bg-[#FFFBF5] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 md:p-6 border border-amber-100/80 flex flex-col">
      <div className="flex items-start gap-4">
        <img src={doctor.imageUrl} alt={doctor.name} className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md" />
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-green-900 leading-tight">{doctor.name}</h3>
          <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus.bg} ${currentStatus.text}`}>
            <span className={`w-2.5 h-2.5 mr-2 rounded-full ${currentStatus.dot}`}></span>
            {doctor.status}
          </div>
          <p className="text-slate-600 mt-1 text-sm md:text-base">{doctor.specialty}</p>
        </div>
      </div>
      <div className="mt-4">
          <p className="text-2xl md:text-3xl font-bold text-amber-500">
            Rp{doctor.price.toLocaleString('id-ID')}
          </p>
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center justify-between mt-6 border-t border-amber-200/60 pt-4">
        <div className="text-center">
            <p className="text-xs md:text-sm text-slate-500">Kepuasan Pasien</p>
            <div className="flex items-center justify-center gap-1 mt-1">
                <ThumbsUpIcon active className="h-6 w-6" />
                <p className="font-bold text-green-800 text-base">{(doctor.rating * 20).toFixed(0)}%</p>
            </div>
        </div>
        <div className="text-center">
             <p className="text-xs md:text-sm text-slate-500">Jumlah Ulasan</p>
             <div className="flex items-center justify-center gap-1 mt-1">
                <ChatBubbleIcon />
                <p className="font-bold text-slate-700 text-base">{(doctor.reviews / 1000).toFixed(1)}rb</p>
             </div>
        </div>
         <button 
            onClick={() => onStartChat(doctor)}
            className="bg-amber-600 text-white px-4 py-3 text-sm rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-300 transform active:scale-95 flex items-center justify-center gap-1.5">
            <StartChatIcon className="h-4 w-4" />
            <span><span className="hidden sm:inline">Mulai </span>Konsultasi</span>
        </button>
      </div>
    </div>
  );
};

const Konsultasi: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating');
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    const filteredAndSortedDoctors = useMemo(() => {
        return dummyDoctors
            .filter(doctor =>
                doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (sortBy === 'rating') {
                    return b.rating - a.rating;
                }
                return a.price - b.price;
            });
    }, [searchTerm, sortBy]);

    const handleStartChat = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleCloseChat = () => {
        setSelectedDoctor(null);
    };

    return (
        <>
            <section className="py-16 md:py-24 min-h-screen">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
                            Konsultasi Ahli Gizi Profesional
                        </h1>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Jadwalkan sesi konsultasi personal dengan salah satu ahli gizi kami.
                        </p>
                    </div>
                    
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <input
                                type="text"
                                placeholder="Cari nama dokter..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-grow w-full px-4 py-3 bg-white text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'rating' | 'price')}
                                className="w-full md:w-auto px-4 py-3 bg-white text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option value="rating">Urutkan: Rating Tertinggi</option>
                                <option value="price">Urutkan: Harga Terendah</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredAndSortedDoctors.map(doctor => (
                                <DoctorCard key={doctor.id} doctor={doctor} onStartChat={handleStartChat} />
                            ))}
                        </div>

                        {filteredAndSortedDoctors.length === 0 && (
                            <div className="text-center col-span-full py-16 bg-white rounded-lg shadow-sm">
                                <p className="text-slate-500 text-lg">Tidak ada dokter yang cocok dengan pencarian Anda.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            
            {selectedDoctor && (
                <ChatModal doctor={selectedDoctor} onClose={handleCloseChat} />
            )}
        </>
    );
};

export default Konsultasi;