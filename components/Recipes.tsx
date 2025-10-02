import React, { useState } from 'react';
import { Recipe } from './RecipeCard';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

// Dummy data for recipes. In a real application, this would come from an API.
const dummyRecipes: Recipe[] = [
  {
    id: 5,
    title: 'Dada Ayam Panggang Lemon Herbs dengan Brokoli Kukus',
    image: 'https://img-global.cpcdn.com/recipes/74f562e508f07f6a/600x852cq80/ayam-panggang-brokoli-diet-26-foto-resep-utama.webp',
    description: 'Hidangan klasik yang sehat, dada ayam empuk dipanggang dengan lemon dan aneka herba, disajikan dengan brokoli kukus yang kaya serat.',
    calories: 360,
    protein: '45g',
    carbs: '10g',
    tags: ['Protein Tinggi', 'Cocok untuk Diabetes', 'Rendah Karbo'],
    ingredients: [
        '250g dada ayam fillet',
        '2 siung bawang putih, cincang halus',
        '1/2 buah lemon, ambil airnya dan iris sisanya',
        '1 sdm minyak zaitun',
        '1 sdt campuran herba kering (rosemary, thyme)',
        '1 bonggol brokoli, potong per kuntum',
        'Garam dan lada hitam secukupnya',
    ],
    instructions: [
        'Panaskan oven hingga 200°C.',
        'Bumbui dada ayam dengan bawang putih, air lemon, minyak zaitun, herba kering, garam, dan lada. Diamkan selama 15 menit.',
        'Letakkan ayam di loyang, letakkan irisan lemon di atasnya.',
        'Panggang ayam di dalam oven selama 20-25 menit atau hingga matang sempurna.',
        'Sementara itu, kukus brokoli selama 5-7 menit hingga matang namun masih renyah.',
        'Sajikan ayam panggang bersama brokoli kukus selagi hangat.'
    ]
  },
  {
    id: 6,
    title: 'Tumis Ayam Brokoli Saus Jahe Kecap Rendah Gula',
    image: 'https://www.mysugarfreekitchen.com/wp-content/uploads/2022/07/Chicken-Broccoli-in-Brown-Sauce-16.jpg',
    description: 'Tumisan cepat saji yang gurih dan sehat. Potongan ayam dan brokoli segar disiram saus jahe kecap yang rendah gula, cocok untuk makan malam.',
    calories: 390,
    protein: '40g',
    carbs: '15g',
    tags: ['Protein Tinggi', 'Rendah Karbo', 'Cepat Saji', 'Cocok untuk Diabetes'],
    ingredients: [
      '250g dada ayam fillet, potong dadu',
      '1 bonggol brokoli, potong per kuntum',
      '3 siung bawang putih, cincang',
      '1 ruas jahe, memarkan',
      '2 sdm kecap asin (rendah sodium)',
      '1 sdm minyak wijen',
      '1 sdm minyak zaitun',
      'Sedikit air dan larutan maizena untuk mengentalkan'
    ],
    instructions: [
      'Panaskan minyak zaitun di wajan. Tumis bawang putih dan jahe hingga harum.',
      'Masukkan potongan ayam, masak hingga berubah warna.',
      'Tambahkan brokoli dan sedikit air. Masak hingga brokoli setengah matang.',
      'Masukkan kecap asin dan minyak wijen. Aduk rata.',
      'Tuangkan larutan maizena, masak hingga saus mengental dan meresap.',
      'Sajikan segera selagi hangat.'
    ]
  },
   {
    id: 1,
    title: 'Casserole Ayam Brokoli Panggang Keju Rendah Lemak',
    image: 'https://images-tastehub.mdlzapps.cloud/images/96bc9219-5554-4c7f-9f75-9e2f9f4f5761.jpg',
    description: 'Hidangan panggang yang creamy dan memuaskan. Menggunakan keju rendah lemak untuk rasa yang kaya tanpa rasa bersalah.',
    calories: 420,
    protein: '38g',
    carbs: '12g',
    tags: ['Protein Tinggi', 'Rendah Karbo', 'Keluarga'],
    ingredients: [
      '300g dada ayam rebus, suwir',
      '1 bonggol brokoli, rebus sebentar',
      '1 cup saus keju rendah lemak (dari susu skim dan keju cheddar rendah lemak)',
      '1/4 cup remah roti gandum untuk taburan',
      'Garam, lada, dan bubuk pala secukupnya',
    ],
    instructions: [
      'Panaskan oven hingga 180°C.',
      'Dalam mangkuk besar, campurkan ayam suwir, brokoli, dan saus keju.',
      'Bumbui dengan garam, lada, dan pala. Aduk rata.',
      'Tuang campuran ke dalam pinggan tahan panas.',
      'Taburi dengan remah roti gandum.',
      'Panggang selama 20-25 menit hingga berwarna keemasan dan bergelembung.',
      'Biarkan dingin sejenak sebelum disajikan.'
    ]
  },
  {
    id: 2,
    title: 'Sate Ayam Brokoli Bumbu Kacang Tanpa Gula',
    image: 'https://www.ngy.co.id/wp-content/uploads/2024/06/Screenshot-2024-06-26-101232.png',
    description: 'Versi sehat dari sate klasik. Ayam dan brokoli dibakar sempurna dan disajikan dengan saus kacang lezat yang dibuat tanpa tambahan gula.',
    calories: 410,
    protein: '42g',
    carbs: '18g',
    tags: ['Protein Tinggi', 'Cocok untuk Diabetes', 'Jajanan Sehat'],
    ingredients: [
      '300g dada ayam, potong dadu',
      '1 bonggol brokoli, potong per kuntum, rebus sebentar',
      'Tusuk sate secukupnya',
      'Bumbu Kacang: 100g kacang tanah sangrai, 3 siung bawang putih, 2 cabai merah, air asam jawa, sedikit garam, air secukupnya',
    ],
    instructions: [
      'Haluskan semua bahan bumbu kacang dengan blender atau ulekan, tambahkan air hingga mencapai kekentalan yang diinginkan.',
      'Tusuk potongan ayam dan kuntum brokoli secara bergantian pada tusuk sate.',
      'Bakar atau panggang sate di atas panggangan hingga matang, olesi dengan sedikit bumbu di tengah proses memanggang.',
      'Sajikan sate dengan siraman sisa bumbu kacang.',
      'Hidangkan dengan irisan bawang merah dan mentimun jika suka.'
    ]
  },
  {
    id: 3,
    title: 'Salmon Panggang Lemon & Dill',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Hidangan utama yang elegan dan sehat. Salmon kaya akan Omega-3, dipadukan dengan asparagus renyah dan aroma segar dari lemon dan dill.',
    calories: 450,
    protein: '40g',
    carbs: '10g',
    tags: ['Protein Tinggi', 'Rendah Karbo', 'Cocok untuk Diabetes'],
    ingredients: [
        '200g fillet salmon',
        '1 ikat asparagus, buang ujung kerasnya',
        '1 sdm minyak zaitun',
        '1 buah lemon, iris tipis',
        '2 sdm dill segar, cincang',
        'Garam dan lada hitam'
    ],
    instructions: [
        'Panaskan oven hingga 200°C.',
        'Letakkan salmon dan asparagus di atas loyang yang dilapisi kertas roti.',
        'Siram dengan minyak zaitun, taburi dengan garam, lada, dan dill cincang.',
        'Letakkan irisan lemon di atas salmon.',
        'Panggang selama 15-20 menit, atau hingga salmon matang sempurna.',
        'Sajikan segera.'
    ]
  },
  {
    id: 4,
    title: 'Smoothie Bowl Tropis Hijau',
    image: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Sarapan atau camilan menyegarkan yang penuh vitamin. Kombinasi bayam, mangga, dan pisang untuk energi sepanjang hari.',
    calories: 320,
    protein: '8g',
    carbs: '60g',
    tags: ['Tinggi Serat', 'Vegetarian', 'Vegan', 'Cepat Saji'],
    ingredients: [
      '1 cup bayam segar',
      '1 buah pisang beku',
      '1/2 cup potongan mangga beku',
      '1/2 cup susu kelapa',
      'Topping: granola, irisan kelapa, biji chia'
    ],
    instructions: [
      'Masukkan bayam, pisang beku, mangga beku, dan susu kelapa ke dalam blender.',
      'Proses hingga halus dan kental.',
      'Tuang ke dalam mangkuk.',
      'Hias dengan topping favorit Anda dan nikmati segera.'
    ]
  },
];


const Recipes: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Inspirasi Resep Trending
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            Gulir ke bawah untuk menemukan hidangan populer dan sehat yang sedang tren saat ini.
          </p>
        </div>
        
        {/* Recipe Feed */}
        <div className="max-w-2xl mx-auto space-y-10">
          {dummyRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onViewRecipe={handleViewRecipe} />
          ))}
        </div>
      </div>

      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />}
    </section>
  );
};

export default Recipes;