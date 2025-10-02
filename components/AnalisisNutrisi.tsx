import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisIcon } from './icons/AnalysisIcon';
import SkeletonAnalysis from './skeletons/SkeletonAnalysis';
import { CalorieIcon } from './icons/CalorieIcon';
import NutritionPieChart from './NutritionPieChart'; // Import komponen baru


interface AnalysisResult {
    foodName: string;
    estimatedCalories: number;
    protein: string;
    carbs: string;
    fat: string;
    healthSummary: string;
    suggestions: string[];
}

const AnalisisNutrisi: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const schema = {
                type: Type.OBJECT,
                properties: {
                    foodName: { type: Type.STRING, description: "Nama makanan yang dianalisis, contoh: 'Nasi Goreng Ayam'." },
                    estimatedCalories: { type: Type.NUMBER, description: "Perkiraan total kalori makanan." },
                    protein: { type: Type.STRING, description: "Perkiraan protein dalam gram, contoh: '25g'." },
                    carbs: { type: Type.STRING, description: "Perkiraan karbohidrat dalam gram, contoh: '50g'." },
                    fat: { type: Type.STRING, description: "Perkiraan lemak dalam gram, contoh: '15g'." },
                    healthSummary: { type: Type.STRING, description: "Ringkasan singkat 2-3 kalimat tentang aspek kesehatan makanan ini." },
                    suggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Daftar 2-3 saran praktis untuk membuat makanan ini lebih sehat." },
                },
                required: ["foodName", "estimatedCalories", "protein", "carbs", "fat", "healthSummary", "suggestions"]
            };
            
            const prompt = `Analisis kandungan nutrisi dari makanan atau bahan berikut: "${userInput}". Berikan perkiraan rincian nutrisi.
            Fokus pada makronutrien utama. Berikan juga ringkasan kesehatan singkat dan beberapa saran konkret untuk membuatnya lebih sehat.
            Pastikan respons Anda sesuai dengan skema JSON yang diberikan.`;

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
            setAnalysisResult(resultJson);

        } catch (e) {
            console.error(e);
            setError("Maaf, terjadi kesalahan saat menganalisis makanan. Pastikan input Anda jelas dan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Fungsi bantuan untuk mengurai gram dari string seperti "25g"
    const parseGrams = (value: string): number => {
        if (typeof value !== 'string') return 0;
        const match = value.match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[0]) : 0;
    };


    return (
        <section className="py-16 md:py-24 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
                        Analisis Nutrisi Makanan
                    </h1>
                    <p className="text-lg text-slate-700 leading-relaxed">
                        Masukkan nama makanan atau daftar bahan untuk mendapatkan analisis nutrisi
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Masukkan nama makanan atau daftar bahan... Contoh: Nasi goreng dengan telur dan ayam. Atau: 150g dada ayam, 1 cup nasi putih, 1 sdm kecap manis"
                        className="w-full h-32 px-4 py-3 bg-white text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow mb-4 resize-y placeholder-slate-500"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={!userInput.trim() || isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-md disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transform hover:scale-105"
                    >
                        <AnalysisIcon className="h-8 w-8" />
                        {isLoading ? 'Menganalisis...' : 'Analisis Sekarang'}
                    </button>
                </div>

                <div className="mt-12 max-w-2xl mx-auto">
                    {isLoading && <SkeletonAnalysis />}
                    {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>}
                    
                    {analysisResult && (
                        (() => {
                            const proteinGrams = parseGrams(analysisResult.protein);
                            const carbsGrams = parseGrams(analysisResult.carbs);
                            const fatGrams = parseGrams(analysisResult.fat);

                            return (
                                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-200/80 animate-fade-in">
                                    <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">{analysisResult.foodName}</h2>
                                    
                                    <div className="border-t border-b border-slate-200 py-6 my-6 bg-slate-50/70 rounded-lg">
                                      <NutritionPieChart 
                                        protein={proteinGrams}
                                        carbs={carbsGrams}
                                        fat={fatGrams}
                                      />
                                      <div className="flex items-center justify-center gap-2 mt-4 text-orange-500">
                                        <CalorieIcon className="w-7 h-7" />
                                        <span className="font-bold text-slate-800 text-xl">
                                          {analysisResult.estimatedCalories}
                                        </span>
                                        <span className="text-slate-600">kcal (Total Energi)</span>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-800 mb-3 border-l-4 border-emerald-500 pl-3">Ringkasan Kesehatan</h3>
                                            <p className="text-slate-700 leading-relaxed">{analysisResult.healthSummary}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-slate-800 mb-3 border-l-4 border-emerald-500 pl-3">Saran</h3>
                                            <ul className="list-disc list-inside space-y-2 text-slate-700">
                                                {analysisResult.suggestions.map((item, index) => (
                                                  <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    )}
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default AnalisisNutrisi;