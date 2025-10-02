import React from 'react';

interface NutritionPieChartProps {
  protein: number;
  carbs: number;
  fat: number;
}

const NutritionPieChart: React.FC<NutritionPieChartProps> = ({ protein, carbs, fat }) => {
  const total = protein + carbs + fat;

  if (total === 0) {
    return <div className="text-center text-slate-500 p-4">Data nutrisi tidak cukup untuk membuat diagram.</div>;
  }

  const data = [
    { name: 'Protein', value: protein, percent: (protein / total) * 100, color: 'stroke-sky-500', bgColor: 'bg-sky-500' },
    { name: 'Karbo', value: carbs, percent: (carbs / total) * 100, color: 'stroke-amber-500', bgColor: 'bg-amber-500' },
    { name: 'Lemak', value: fat, percent: (fat / total) * 100, color: 'stroke-lime-600', bgColor: 'bg-lime-600' },
  ];

  const size = 180;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            className="text-slate-200"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {data.map((item) => {
            if (item.percent === 0) return null;
            const offset = circumference - (item.percent / 100) * circumference;
            const rotation = (accumulatedPercent / 100) * 360;
            accumulatedPercent += item.percent;

            return (
              <circle
                key={item.name}
                className={item.color}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease-out' }}
              />
            );
          })}
        </svg>
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-slate-800">
              {Math.round(total)}g
            </span>
            <span className="text-sm text-slate-500 font-medium">Total Makro</span>
         </div>
      </div>
      <div className="flex flex-col gap-4 self-center">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-3 text-left">
             <span className={`w-3 h-6 rounded-sm ${item.bgColor}`}></span>
             <div>
                <span className="font-semibold text-slate-800">{item.name}</span>
                <div className="text-slate-500 text-sm">
                  <span>{item.value.toFixed(1)}g</span>
                  <span className="mx-1 text-slate-300">|</span>
                  <span>{item.percent.toFixed(0)}%</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionPieChart;
