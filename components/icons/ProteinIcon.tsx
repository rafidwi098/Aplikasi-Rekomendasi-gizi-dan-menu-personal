import React from 'react';

export const ProteinIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M1.5 12.5C1.5 12.5 5 9 10 9s8.5 3.5 8.5 3.5-3.5 3.5-8.5 3.5S1.5 12.5 1.5 12.5z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 12.5L22.5 10v5L20 12.5" 
    />
    <circle cx="16" cy="11.5" r="1" fill="currentColor" />
  </svg>
);