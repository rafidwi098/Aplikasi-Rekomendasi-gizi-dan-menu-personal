import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200/80">
      <div className="animate-pulse">
        <div className="bg-slate-200 h-48 w-full"></div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="h-5 bg-slate-200 rounded-full w-20"></div>
            <div className="h-5 bg-slate-200 rounded-full w-24"></div>
          </div>
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="border-t border-b border-slate-200 py-3 mb-5">
            <div className="flex justify-around">
                <div className="flex flex-col items-center gap-1 w-16">
                  <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                  <div className="h-5 bg-slate-200 rounded w-10"></div>
                  <div className="h-3 bg-slate-200 rounded w-8"></div>
                </div>
                <div className="flex flex-col items-center gap-1 w-16">
                  <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                  <div className="h-5 bg-slate-200 rounded w-10"></div>
                  <div className="h-3 bg-slate-200 rounded w-12"></div>
                </div>
                <div className="flex flex-col items-center gap-1 w-16">
                  <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                  <div className="h-5 bg-slate-200 rounded w-10"></div>
                  <div className="h-3 bg-slate-200 rounded w-10"></div>
                </div>
            </div>
          </div>
          <div className="h-12 bg-slate-200 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;