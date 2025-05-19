import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import EmeraldModel from './EmeraldModel';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="home" className="pt-24 h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-offwhite to-emerald/5 dark:from-charcoal dark:to-emerald-dark/20 z-0" />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <motion.h1 
              className="font-serif text-4xl md:text-6xl font-light text-emerald-dark dark:text-emerald hero-text mb-6 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.hero.title}<br />
              <span className="font-medium">{t.hero.subtitle}</span>
            </motion.h1>
            
            <motion.p 
              className="text-charcoal/80 dark:text-offwhite/80 text-lg md:text-xl max-w-md mx-auto md:mx-0 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t.hero.description}
            </motion.p>
            
            <motion.a 
              href="#about"
              className="inline-block px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-offwhite transition-all font-sans uppercase tracking-widest text-sm gem-cursor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212, 175, 55, 0.5)" }}
            >
              {t.hero.cta}
            </motion.a>
          </div>
          
          <div className="md:w-1/2 h-[300px] md:h-[500px] relative">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><span className="text-gold">Loading emerald...</span></div>}>
              <EmeraldModel />
            </Suspense>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator gem-cursor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a href="#about" aria-label="Scroll down">
          <ChevronDown className="text-gold w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;