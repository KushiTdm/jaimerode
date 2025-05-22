import React from 'react';
import { motion } from 'framer-motion';
import { Diamond } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';  // import du contexte
import { translations } from '../translations';             // import des traductions
import { useNewsletterForm } from '../hooks/useNewsletterForm'; // 👈 hook importé


const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const {
    email,
    setEmail,
    loading,
    status,
    submit
  } = useNewsletterForm(); // 👈 hook utilisé
    
  return (
    <footer className="bg-charcoal dark:bg-black text-offwhite py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <Diamond className="h-6 w-6 text-gold" />
              <span className="font-serif text-xl tracking-wider text-emerald">J'AIME RÔDE</span>
            </div>
            <p className="text-sm text-offwhite/60 mt-2 max-w-md">
              {t.footer.description}
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="font-serif text-lg mb-3 text-emerald">{t.footer.newsletter.title}</h3>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex">
              <input 
                type="email" 
                placeholder={t.footer.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 bg-white/10 border border-offwhite/20 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold/50 text-sm w-48 md:w-64"
              />
              <button 
                onClick={submit}
                disabled={loading}
                className="px-4 py-2 bg-gold text-charcoal rounded-r-md font-sans uppercase tracking-widest text-xs gem-cursor hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                {loading ? '...' : t.footer.newsletter.submit}
              </button>
            </div>

            {status === 'success' && (
              <p className="text-emerald text-xs mt-2">Merci pour votre inscription !</p>
            )}
            {status === 'duplicate' && (
              <p className="text-yellow-400 text-xs mt-2">Adresse déjà enregistrée.</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-xs mt-2">Erreur. Veuillez réessayer.</p>
            )}
          </div>

          </div>
        </div>
        
        <div className="border-t border-offwhite/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <motion.ul 
                className="flex space-x-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {['Home', 'About', 'Research', 'Gallery', 'Contact'].map((item) => (
                  <motion.li 
                    key={item}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-offwhite/70 hover:text-gold text-sm transition-colors gem-cursor"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <div className="text-offwhite/50 text-sm">
              &copy; {new Date().getFullYear()} J'aime rôde Research Institute. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;