import React from 'react';

export const GrainsIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M10 20S11 12 4 8m10 12s-1-8 6-12" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8 12l-2 2m8-8l2-2m-4 4l-2 2m6-6l2-2" 
    />
  </svg>
);