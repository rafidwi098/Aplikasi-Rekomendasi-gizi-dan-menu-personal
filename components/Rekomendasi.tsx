import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from './RecipeCard';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';
import { SearchIcon } from './icons/SearchIcon';
import { TrashIcon } from './icons/TrashIcon';
import { FilterIcon } from './icons/FilterIcon';
import { HealthProfile } from '../App';
import SkeletonCard from './skeletons/SkeletonCard';
import { FinalChefHatIcon } from './icons/ChefHatIcon';

// Fix: Add props interface to accept healthProfile
interface RekomendasiProps {
  healthProfile: HealthProfile;
}

const filters = [
  'Semua',
  'Protein Tinggi',
  'Cocok untuk Diabetes',
  'Tinggi Serat',
  'Vegetarian',
  'Vegan',
  'Rendah Karbo',
  'Cepat Saji',
];

// Fix: Update component signature to accept props
const Rekomendasi: React.FC<RekomendasiProps> = ({ healthProfile }) => {
  const [ingredients, setIngredients] = useState<string[]>(['ayam', 'brokoli', 'bawang putih']);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeFilter, setActiveFilter] = useState('Semua');
  
  const handleAddIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim().toLowerCase())) {
      setIngredients([...ingredients, currentIngredient.trim().toLowerCase()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleGenerateRecommendations = async () => {
    if (ingredients.length === 0) return;

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setActiveFilter('Semua'); // Reset filter on new generation

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Nama resep yang menarik dan singkat." },
            image: { type: Type.STRING, description: "URL gambar WAJIB dari Unsplash Source. HARUS dalam format 'https://source.unsplash.com/800x600/?<english_keywords>'. Kata kunci HARUS dalam bahasa Inggris, deskriptif, dan dipisahkan koma (contoh: 'professional food photography, grilled chicken, broccoli'). JANGAN PERNAH gunakan judul resep sebagai URL." },
            description: { type: Type.STRING, description: "Deskripsi singkat (2-3 kalimat) dan menggugah selera tentang hidangan tersebut." },
            calories: { type: Type.NUMBER, description: "Perkiraan jumlah kalori per porsi." },
            protein: { type: Type.STRING, description: "Jumlah protein dengan satuan, contoh: '30g'" },
            carbs: { type: Type.STRING, description: "Jumlah karbohidrat dengan satuan, contoh: '25g'" },
            tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tag relevan seperti 'Protein Tinggi', 'Vegan', 'Cepat Saji', 'Cocok untuk Diabetes'." },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Daftar lengkap bahan yang dibutuhkan." },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Langkah-langkah memasak yang jelas dan berurutan." },
          },
          required: ["title", "image", "description", "calories", "protein", "carbs", "tags", "ingredients", "instructions"]
        }
      };
      
      const healthContext = `
        Profil Kesehatan Pengguna:
        - Tujuan: ${healthProfile.goal}
        - Kondisi Medis: ${healthProfile.conditions.join(', ') || 'Tidak ada'}
        - Alergi: ${healthProfile.allergies}
        - Preferensi Diet: ${healthProfile.diet}
      `;
      
       const prompt = `Berdasarkan bahan-bahan berikut: ${ingredients.join(', ')} dan dengan mempertimbangkan profil kesehatan pengguna ini: ${healthContext}.
      Buatkan 4 rekomendasi resep yang beragam dan sangat sesuai dengan profil kesehatan pengguna. Resep harus mengutamakan bahan-bahan yang disediakan tetapi boleh menyertakan bahan pokok umum lainnya.
      Untuk setiap resep, berikan semua bidang yang ditentukan dalam skema JSON.

      PENTING SEKALI: Untuk properti 'image', Anda WAJIB membuat URL dari Unsplash Source.
      1. Formatnya harus: 'https://source.unsplash.com/800x600/?<keywords>'.
      2. 'keywords' HARUS berupa kata kunci fotografi makanan yang relevan, dalam BAHASA INGGRIS, dipisahkan dengan koma.
      3. Contoh kata kunci yang bagus: 'delicious grilled chicken breast with steamed broccoli', 'healthy salmon salad food photography', 'spicy lentil soup close-up'.
      4. JANGAN PERNAH menggunakan judul resep sebagai kata kunci atau URL. Ini akan menghasilkan gambar yang salah.
      
      Sertakan tag yang relevan dari daftar berikut jika sesuai: 'Protein Tinggi', 'Cocok untuk Diabetes', 'Tinggi Serat', 'Vegetarian', 'Vegan', 'Rendah Karbo', 'Cepat Saji'. Prioritaskan tag yang sesuai dengan kondisi medis pengguna.`;


      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      const resultText = response.text.trim();
      const resultJson = JSON.parse(resultText);
      
      const recipesWithIds: Recipe[] = resultJson.map((recipe: Omit<Recipe, 'id'>, index: number) => ({
        ...recipe,
        id: Date.now() + index, 
      }));

      setRecommendations(recipesWithIds);

    } catch (e) {
      console.error(e);
      setError("Maaf, terjadi kesalahan saat membuat rekomendasi. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewRecipe = (recipe: Recipe) => setSelectedRecipe(recipe);
  const handleCloseModal = () => setSelectedRecipe(null);

  const filteredRecommendations = activeFilter === 'Semua'
    ? recommendations
    : recommendations.filter(recipe => recipe.tags.includes(activeFilter));

  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Dapatkan Rekomendasi Resep
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            Masukkan bahan-bahan yang Anda miliki, dan biarkan kami menemukan resep yang sehat dan optimal untuk Anda.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
              placeholder="Contoh: telur, tomat, bayam..."
              className="flex-grow w-full px-4 py-3 bg-white text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow placeholder-slate-500"
            />
            <button
              onClick={handleAddIngredient}
              className="w-full sm:w-auto bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Tambah
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-6 min-h-[40px]">
            {ingredients.map((ingredient) => (
              <span key={ingredient} className="flex items-center bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full">
                {ingredient}
                <button onClick={() => handleRemoveIngredient(ingredient)} className="ml-2 text-slate-500 hover:text-slate-800">
                  <TrashIcon />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={handleGenerateRecommendations}
            disabled={ingredients.length === 0 || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            <SearchIcon />
            {isLoading ? 'Menghasilkan...' : 'Hasilkan Rekomendasi'}
          </button>
        </div>

        <div className="mt-16">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}
          {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>}
          
          {!isLoading && recommendations.length === 0 && !error && (
             <div className="text-center text-slate-600 py-16 px-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/80">
                <div className="flex justify-center items-center mb-4">
                  <FinalChefHatIcon />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mt-4">Menunggu Inspirasi...</h3>
                <p className="max-w-md mx-auto mt-2">
                  Masukkan bahan-bahan yang Anda miliki di atas, dan kami akan menyajikan resep-resep pilihan khusus untuk Anda.
                </p>
            </div>
          )}

          {!isLoading && recommendations.length > 0 && (
            <>
              {/* Filters */}
              <div className="mb-12">
                  <div className="flex items-center justify-center mb-4">
                      <FilterIcon />
                      <h2 className="text-xl font-semibold text-slate-800 ml-2">Filter Hasil</h2>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                      {filters.map(filter => (
                          <button
                              key={filter}
                              onClick={() => setActiveFilter(filter)}
                              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-200 ${
                                  activeFilter === filter
                                      ? 'bg-emerald-500 text-white shadow-md'
                                      : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                              }`}
                          >
                              {filter}
                          </button>
                      ))}
                  </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredRecommendations.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} onViewRecipe={handleViewRecipe} />
                ))}
              </div>
              
              {filteredRecommendations.length === 0 && (
                <div className="text-center col-span-full py-16">
                    <p className="text-slate-500 text-lg">Tidak ada rekomendasi yang cocok dengan filter "{activeFilter}".</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />}
    </section>
  );
};

export default Rekomendasi;