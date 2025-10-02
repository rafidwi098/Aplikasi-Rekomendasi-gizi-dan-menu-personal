import React, { useState } from 'react';
import RecipeCard, { Recipe } from './RecipeCard';
import RecipeModal from './RecipeModal';

// A subset of recipes for the preview
const trendingRecipes: Recipe[] = [
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
    id: 5,
    title: 'Dada Ayam Panggang Lemon Herbs',
    image: 'https://img-global.cpcdn.com/recipes/74f562e508f07f6a/600x852cq80/ayam-panggang-brokoli-diet-26-foto-resep-utama.webp',
    description: 'Hidangan klasik yang sehat, dada ayam empuk dipanggang dengan lemon dan aneka herba, disajikan dengan brokoli kukus.',
    calories: 360,
    protein: '45g',
    carbs: '10g',
    tags: ['Protein Tinggi', 'Rendah Karbo'],
    ingredients: [
        '250g dada ayam fillet',
        '2 siung bawang putih, cincang halus',
        '1/2 buah lemon',
        '1 sdm minyak zaitun',
        '1 sdt campuran herba kering',
        '1 bonggol brokoli',
        'Garam dan lada hitam secukupnya',
    ],
    instructions: [
        'Panaskan oven hingga 200°C.',
        'Bumbui dada ayam dengan bawang putih, air lemon, minyak zaitun, herba, garam, dan lada.',
        'Panggang ayam di dalam oven selama 20-25 menit.',
        'Kukus brokoli selama 5-7 menit.',
        'Sajikan ayam panggang bersama brokoli kukus.'
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
    tags: ['Tinggi Serat', 'Vegetarian', 'Vegan'],
    ingredients: [
      '1 cup bayam segar',
      '1 buah pisang beku',
      '1/2 cup potongan mangga beku',
      '1/2 cup susu kelapa',
      'Topping: granola, irisan kelapa, biji chia'
    ],
    instructions: [
      'Masukkan semua bahan ke dalam blender.',
      'Proses hingga halus dan kental.',
      'Tuang ke dalam mangkuk dan hias dengan topping.'
    ]
  },
];

interface TrendingRecipesPreviewProps {
  onNavigate: (page: string) => void;
}

const TrendingRecipesPreview: React.FC<TrendingRecipesPreviewProps> = ({ onNavigate }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <>
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Inspirasi Resep Populer
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Lihat beberapa resep sehat dan lezat yang paling disukai oleh komunitas kami.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {trendingRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onViewRecipe={handleViewRecipe} />
            ))}
          </div>
          <div className="text-center mt-16">
              <button
              onClick={() => onNavigate('resep')}
              className="bg-emerald-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-md transform hover:scale-105 active:scale-95"
            >
              Lihat Semua Resep
            </button>
          </div>
        </div>
      </section>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />}
    </>
  );
};

export default TrendingRecipesPreview;
