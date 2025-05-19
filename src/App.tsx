import { useState, useEffect } from 'react';
import { Moon, Sun, Languages } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialIcons from './components/SocialIcons';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function MainApp() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="relative">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main>
          <Hero />
          <About />
          <Research />
          <Gallery />
          <Contact />
        </main>
        
        <div className="fixed bottom-6 right-6 z-50">
          <SocialIcons />
        </div>
        
        <div className="fixed top-20 md:top-6 right-6 md:right-6 md:left-auto z-50 flex flex-col space-y-4">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full bg-offwhite dark:bg-charcoal shadow-md border border-gold/20 gem-cursor transition-all duration-300 hover:scale-110"
            aria-label={language === 'en' ? 'Switch to French' : 'Switch to English'}
          >
            <Languages className="w-5 h-5 text-gold" />
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-offwhite dark:bg-charcoal shadow-md border border-gold/20 gem-cursor transition-all duration-300 hover:scale-110"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <Sun className="w-5 h-5 text-gold" />
              ) : (
                <Moon className="w-5 h-5 text-gold" />
              )}
            </AnimatePresence>
          </button>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

export default App;
