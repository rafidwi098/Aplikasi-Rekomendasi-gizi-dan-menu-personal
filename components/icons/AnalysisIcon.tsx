import React from 'react';

export const AnalysisIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-16 w-16"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21a9 9 0 01-2.99-1.49l-5.12 2.6A1 1 0 010 21.05V15.5a9 9 0 0118 0v5.55a1 1 0 01-1.89.45l-5.12-2.6A9 9 0 019 21zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.707 16.707l3.586 3.586" />
  </svg>
);