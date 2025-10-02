import React from 'react';

export const LightbulbIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-10 w-10" 
        viewBox="0 0 64 64"
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="tomatoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#f87171'}} />
                <stop offset="100%" style={{stopColor: '#ef4444'}} />
            </linearGradient>
            <linearGradient id="carrotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#fb923c'}} />
                <stop offset="100%" style={{stopColor: '#f97316'}} />
            </linearGradient>
        </defs>

        {/* --- Main Group --- */}
        <g strokeLinecap="round" strokeLinejoin="round">
            {/* Bulb Glass Outline */}
            <path 
                d="M41.6,52.5C48.8,48,53,39.3,53,30.5A21,21,0,1,0,11,30.5c0,8.8,4.2,17.5,11.4,22" 
                fill="rgba(16, 185, 129, 0.05)"
                stroke="#047857"
                strokeWidth="2.5"
            />
            
            {/* Bulb Base */}
            <path d="M23.5 56.5H40.5" stroke="#065f46" strokeWidth="3" fill="#6ee7b7" />
            <path d="M25.5 52.5H38.5" stroke="#065f46" strokeWidth="3" fill="#34d399" />

            {/* Fork */}
            <g stroke="#047857" strokeWidth="2.5" fill="none">
                <path d="M32 45V34" />
                <path d="M28 32 C28 28, 36 28, 36 32" />
                <path d="M27.5 32V28" />
                <path d="M32 32V27.5" />
                <path d="M36.5 32V28" />
            </g>
            
            {/* --- Food Items --- */}
            {/* Tomato */}
            <g transform="rotate(-15, 23, 23)">
                <circle cx="23" cy="23" r="5.5" fill="url(#tomatoGradient)" stroke="#b91c1c" strokeWidth="1" />
                <path d="M23 18.5 A 2 2 0 0 1 24 17 L 25 18 L 23 18.5Z" fill="#16a34a" />
                 <path d="M21.5 21 A 3 3 0 0 1 23 20" fill="none" stroke="#fee2e2" strokeWidth="1" strokeLinecap="round" />
            </g>
            
            {/* Carrot */}
            <g transform="rotate(15, 38, 22)">
                <path d="M39 19.5 C 39 19.5, 36 29, 34 30.5 C 32 32, 33.5 20, 39 19.5Z" fill="url(#carrotGradient)" stroke="#c2410c" strokeWidth="1" />
                <path d="M38 19 L40 17 M40 19 L42 18" stroke="#15803d" strokeWidth="1.5" />
            </g>
            
            {/* Leaf 1 (bottom left) */}
            <path d="M21 34 C 27 28, 32 30, 32 30" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            
            {/* Leaf 2 (top left) */}
            <path d="M25 15.5 C 28 14, 30 17, 30 17" fill="#34d399" stroke="#16a34a" strokeWidth="1" />

            {/* Leaf 3 (top right) */}
            <path d="M42 27 C 37 23, 33 26, 33 26" fill="#34d399" stroke="#16a34a" strokeWidth="1" />
            
             {/* --- Decorative Elements --- */}
            <g fill="#facc15">
                <circle cx="17" cy="19" r="1.2" />
                <circle cx="46" cy="21" r="1.2" />
            </g>
            <g stroke="#059669" strokeWidth="1.5">
                <path d="M45 14 v 4 m-2 -2 h 4" />
                <path d="M15 28 v 4 m-2 -2 h 4" />
            </g>
             <path d="M18 38 A 5 5 0 0 1 21 37" fill="none" stroke="#a7f3d0" strokeWidth="1.5" />
        </g>
    </svg>
);