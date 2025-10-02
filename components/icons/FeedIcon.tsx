import React from 'react';

export const FeedIcon: React.FC<{ active?: boolean }> = ({ active }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-7 w-7" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        {active ? (
            <path 
                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM10 8v8l6-4-6-4z"
                fill="#34D399"
                stroke="#34D399"
                fillRule="evenodd"
            />
        ) : (
            <g fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <polygon points="10,8 16,12 10,16"></polygon>
            </g>
        )}
    </svg>
);