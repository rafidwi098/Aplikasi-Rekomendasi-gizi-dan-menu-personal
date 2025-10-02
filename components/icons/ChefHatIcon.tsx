import React from 'react';

export const ChefHatIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-20 w-20 text-slate-300" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" 
      transform="rotate(90 12 12)" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M5 12.552A8.954 8.954 0 0112 8c1.353 0 2.642.308 3.824.862l-1.464 1.464A6.956 6.956 0 0012 10a6.956 6.956 0 00-2.36 4.318L5 12.552zM19 12.552a8.954 8.954 0 00-7-4.552c-1.353 0-2.642.308-3.824.862l1.464 1.464A6.956 6.956 0 0112 10c.837 0 1.625.161 2.36.452l4.64-1.904z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M5 21v-5.272A8.954 8.954 0 0112 13a8.954 8.954 0 017 2.728V21H5z" 
    />
  </svg>
);
// A simplified chef hat icon for demonstration
export const SimpleChefHatIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="80" 
        height="80" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-slate-300"
    >
        <path d="M19.5 14.25c0 2.485-2.015 4.5-4.5 4.5s-4.5-2.015-4.5-4.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5z"/>
        <path d="M15 9.75V19.5"/>
        <path d="M10.5 14.25c0 2.485-2.015 4.5-4.5 4.5S1.5 16.735 1.5 14.25c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5z"/>
        <path d="M6 9.75V19.5"/>
        <path d="M12 4.5v15"/>
    </svg>
);

// Final choice for better representation
export const FinalChefHatIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L12 6"/>
        <path d="M12 10C12 10 12 10 12 10 12 10 12 10 12 10 10.3431 10 9 8.65685 9 7 9 5.34315 10.3431 4 12 4 13.6569 4 15 5.34315 15 7 15 8.65685 13.6569 10 12 10z"/>
        <path d="M18 10C18 10 18 10 18 10 18 10 18 10 18 10 16.3431 10 15 8.65685 15 7 15 5.34315 16.3431 4 18 4 19.6569 4 21 5.34315 21 7 21 8.65685 19.6569 10 18 10z"/>
        <path d="M6 10C6 10 6 10 6 10 6 10 6 10 6 10 4.34315 10 3 8.65685 3 7 3 5.34315 4.34315 4 6 4 7.65685 4 9 5.34315 9 7 9 8.65685 7.65685 10 6 10z"/>
        <path d="M4 14L20 14"/>
        <path d="M4 18L20 18"/>
        <path d="M4 22L20 22"/>
    </svg>
)
