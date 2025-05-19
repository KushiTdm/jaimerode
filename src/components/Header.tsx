import React, { useState, useEffect } from 'react';
import { Diamond } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-offwhite/80 dark:bg-charcoal/80 backdrop-blur-md py-3 shadow-md' 
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Diamond className="h-7 w-7 text-emerald-dark dark:text-emerald" />
          <span className="font-serif text-xl tracking-wider text-emerald-dark dark:text-emerald font-normal ">J'AIME RÔDE</span>
        </div>
        
        <nav>
          <ul className={`md:flex md:space-x-8 ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 right-0 md:top-auto bg-offwhite/95 dark:bg-charcoal/95 md:bg-transparent dark:md:bg-transparent py-4 md:py-0 px-4 md:px-0 shadow-lg md:shadow-none`}>
            {Object.entries(t.nav).map(([key, value]) => (
              <li key={key} className="mb-4 md:mb-0">
                <a 
                  href={`#${key}`} 
                  className="font-sans text-sm uppercase tracking-widest font-light hover:text-gold gem-cursor relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full block md:inline-block"
                  onClick={handleNavClick}
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
          
          <button 
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 space-y-1.5">
              <span className={`block h-0.5 bg-emerald-dark dark:bg-emerald transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-emerald-dark dark:bg-emerald transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-emerald-dark dark:bg-emerald transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;