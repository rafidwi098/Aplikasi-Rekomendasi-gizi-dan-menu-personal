import React from 'react';

const SkeletonAnalysis: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
            <div className="animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-1/2 mx-auto mb-6"></div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8 border-t border-b border-slate-200 py-6">
                    <div className="space-y-2">
                        <div className="h-6 bg-slate-200 rounded w-16 mx-auto"></div>
                        <div className="h-4 bg-slate-200 rounded w-8 mx-auto"></div>
                    </div>
                     <div className="space-y-2">
                        <div className="h-6 bg-slate-200 rounded w-12 mx-auto"></div>
                        <div className="h-4 bg-slate-200 rounded w-16 mx-auto"></div>
                    </div>
                     <div className="space-y-2">
                        <div className="h-6 bg-slate-200 rounded w-12 mx-auto"></div>
                        <div className="h-4 bg-slate-200 rounded w-12 mx-auto"></div>
                    </div>
                     <div className="space-y-2">
                        <div className="h-6 bg-slate-200 rounded w-12 mx-auto"></div>
                        <div className="h-4 bg-slate-200 rounded w-10 mx-auto"></div>
                    </div>
                </div>
                
                <div className="space-y-8">
                    <div>
                        <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        </div>
                    </div>
                    <div>
                        <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                         <div className="space-y-3">
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonAnalysis;
