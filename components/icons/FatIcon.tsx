import React from 'react';

export const FatIcon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M12 21.5C12 21.5 6.5 17.5 6.5 12.5C6.5 7.507 12 2.5 12 2.5S17.5 7.507 17.5 12.5C17.5 17.5 12 21.5 12 21.5z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 12.5m-2.5 0a2.5 2.5 0 105 0 2.5 2.5 0 10-5 0" 
    />
  </svg>
);