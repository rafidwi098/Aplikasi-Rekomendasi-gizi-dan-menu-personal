import React from 'react';

export const CarbsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className || "h-8 w-8"}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20.5 11A8.5 8.5 0 0012 2.5a8.5 8.5 0 00-8.5 8.5c0 2.863 1.407 5.422 3.562 6.962" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 12.5a2 2 0 100-4 2 2 0 000 4z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M17.5 17.5c-1.657 1.657-4.343 1.657-6 0m6 0L21 21" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.5 17.962C5.658 19.5 8.217 20.5 11 20.5c2.186 0 4.21-.6 5.962-1.6" 
    />
  </svg>
);