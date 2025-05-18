import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="about" className="py-24 bg-offwhite dark:bg-charcoal">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-emerald-dark dark:text-emerald font-light tracking-wider">
            {t.about.title} <span className="font-medium">{t.about.subtitle}</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-8" />
          <p className="text-charcoal/80 dark:text-offwhite/80 mb-6 leading-relaxed">
            {t.about.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-2xl mb-6 text-emerald-dark dark:text-emerald">
              {t.about.section.title}
            </h3>
            <p className="mb-4 text-charcoal/80 dark:text-offwhite/80">
              {t.about.section.text1}
            </p>
            <p className="mb-6 text-charcoal/80 dark:text-offwhite/80">
              {t.about.section.text2}
            </p>
            <div className="flex space-x-4 mb-6">
              <div className="w-1/3 h-1 bg-emerald-dark rounded-full dark:bg-emerald" />
              <div className="w-1/3 h-1 bg-gold rounded-full" />
              <div className="w-1/3 h-1 bg-emerald-light rounded-full" />
            </div>
            <p className="italic text-sm font-serif text-charcoal/60 dark:text-offwhite/60">
              {t.about.section.quote}
            </p>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg h-48 md:h-64">
                <img 
                  src="https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Close-up of raw emerald" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-lg h-40 md:h-56">
                <img 
                  src="https://images.pexels.com/photos/6044257/pexels-photo-6044257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Emerald jewelry" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <div className="overflow-hidden rounded-lg h-40 md:h-56">
                <img 
                  src="https://images.pexels.com/photos/10017623/pexels-photo-10017623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Emerald mining" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-lg h-48 md:h-64">
                <img 
                  src="https://images.pexels.com/photos/9429853/pexels-photo-9429853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Emerald under microscope" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;