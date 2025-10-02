import React from 'react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

type NavItem = {
    id: string;
    label: string;
    // FIX: The type for `icon` was too generic. By specifying that it is a ReactElement
    // that accepts a `className` prop, we can use `React.cloneElement` without a type error.
    icon?: React.ReactElement<{ className?: string }>;
    iconUrl?: string;
};

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', iconUrl: 'https://i.imgur.com/A5VJRbl.png' },
    { id: 'profil', label: 'Profil', iconUrl: 'https://i.imgur.com/JeeuIBd.png' },
    { id: 'setting', label: 'Setting', iconUrl: 'https://i.imgur.com/K4Ow5fL.png' },
  ];

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 z-50">
      <nav className="flex justify-around items-stretch h-20 px-1">
        {navItems.map(item => {
          const isActive = currentPage === item.id;
          const iconClasses = `h-7 w-7 object-contain transition-all duration-200 ${isActive ? 'scale-110' : 'opacity-80 group-hover:opacity-100'}`;
          
          let iconElement;
          if (item.icon) {
            // Fix: The type of `item.icon` is now correctly inferred, allowing `cloneElement` to pass `className`.
            // The cast and template literal are no longer necessary.
            iconElement = React.cloneElement(item.icon, { className: iconClasses });
          } else if (item.iconUrl) {
            iconElement = <img src={item.iconUrl} alt={item.label} className={iconClasses} />;
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center text-center flex-1 h-full focus:outline-none focus:bg-black/5 rounded-lg group p-1 ${isActive ? 'text-emerald-600' : 'text-slate-600'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {iconElement}
              <span className={`text-xs mt-1.5 transition-colors ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomNav;