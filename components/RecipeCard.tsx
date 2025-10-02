import React from 'react';
import { CalorieIcon } from './icons/CalorieIcon';
import { ProteinIcon } from './icons/ProteinIcon';
import { CarbsIcon } from './icons/CarbsIcon';


export interface Recipe {
  id: number;
  title: string;
  image: string;
  description: string;
  calories: number;
  protein: string;
  carbs: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewRecipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden flex flex-col transition-all duration-300 border border-slate-200/80">
      <div className="overflow-hidden h-48">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3 flex flex-wrap gap-2">
          {recipe.tags.slice(0, 3).map(tag => (
            <span key={tag} className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2 flex-grow">{recipe.title}</h3>
        <p className="text-slate-700 text-base mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex justify-around text-sm text-slate-700 mb-5 font-medium border-t border-b border-slate-200 py-3 bg-slate-50/80 rounded-md">
          <div className="text-center flex flex-col items-center gap-1">
            <CalorieIcon className="w-8 h-8 text-orange-500" />
            <span className="font-bold text-slate-800 text-base">{recipe.calories}</span>
            <span className="block text-xs text-slate-500">kcal</span>
          </div>
          <div className="text-center flex flex-col items-center gap-1">
             <ProteinIcon className="w-8 h-8 text-sky-500" />
            <span className="font-bold text-slate-800 text-base">{recipe.protein}</span>
            <span className="block text-xs text-slate-500">Protein</span>
          </div>
           <div className="text-center flex flex-col items-center gap-1">
            <CarbsIcon className="w-8 h-8 text-amber-500" />
            <span className="font-bold text-slate-800 text-base">{recipe.carbs}</span>
            <span className="block text-xs text-slate-500">Karbo</span>
          </div>
        </div>
        <button 
          onClick={() => onViewRecipe(recipe)}
          className="w-full mt-auto text-center bg-emerald-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
        >
          Lihat Resep Lengkap
        </button>
      </div>
       <style>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  );
};

export default RecipeCard;