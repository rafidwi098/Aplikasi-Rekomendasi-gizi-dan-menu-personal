import React from 'react';

export const FruitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className || "h-9 w-9"}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15.25 8.75A6.5 6.5 0 0012 6.5a6.5 6.5 0 00-3.25 2.25A6.5 6.5 0 006.5 15c0 2.45 1.34 4.58 3.32 5.65.3.16.63.25.98.25s.68-.09.98-.25C13.78 19.58 15.12 17.45 15.12 15a6.5 6.5 0 00.13-1.25z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 6.5V4a1.5 1.5 0 013 0v.5" 
    />
  </svg>
);