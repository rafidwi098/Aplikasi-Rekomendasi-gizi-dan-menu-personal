import React from 'react';
import { Recipe } from './RecipeCard';
import { CloseIcon } from './icons/CloseIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-scale-in border border-slate-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="relative">
          <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-t-2xl" />
          <button 
            onClick={onClose} 
            className="absolute top-4 left-4 bg-white/70 text-slate-800 rounded-full p-2 hover:bg-white transition-colors"
            aria-label="Kembali"
          >
            <ArrowLeftIcon />
          </button>
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white/70 text-slate-800 rounded-full p-2 hover:bg-white transition-colors"
            aria-label="Tutup modal"
          >
            <CloseIcon />
          </button>
        </div>
        
        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">{recipe.title}</h2>
          
          <div className="mb-6 flex flex-wrap gap-2">
            {recipe.tags.map(tag => (
              <span key={tag} className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-slate-600 mb-8 border-t border-b border-slate-200 py-4">
            <div><span className="font-bold text-slate-800">🔥 {recipe.calories}</span> kcal</div>
            <div><span className="font-bold text-slate-800">💪 {recipe.protein}</span> Protein</div>
            <div><span className="font-bold text-slate-800">🌾 {recipe.carbs}</span> Karbo</div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3 border-l-4 border-emerald-500 pl-3">Bahan-bahan</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-3">Cara Memasak</h3>
              <ol className="list-decimal list-inside space-y-3 text-slate-600 leading-relaxed">
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RecipeModal;