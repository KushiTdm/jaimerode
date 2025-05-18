import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, GemIcon as GemStone, Map, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface ResearchCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  delay: number;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ title, content, icon, delay }) => {
  return (
    <motion.div 
      className="bg-white/70 dark:bg-charcoal/70 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg border border-emerald/10 dark:border-emerald/20 hover:border-gold/30 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(80, 200, 120, 0.1)' }}
    >
      <div className="text-gold mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-offwhite dark:bg-charcoal border border-gold/20">
        {icon}
      </div>
      <h3 className="font-serif text-xl mb-3 text-emerald-dark dark:text-emerald">{title}</h3>
      <p className="text-charcoal/80 dark:text-offwhite/80 text-sm leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
};

const Research: React.FC = () => {
  const { language } = useLanguage();

  const t = translations[language]?.research ?? {
    title: "",
    subtitle: "",
    description: "",
    areas: {
      gemological: { title: "", content: "" },
      crystal: { title: "", content: "" },
      geographic: { title: "", content: "" },
      ethical: { title: "", content: "" }
    },
    cta: "",
  };

  const areas = t.areas ?? {};

  const researchAreas = [
    {
      title: areas.gemological?.title ?? "",
      content: areas.gemological?.content ?? "",
      icon: <Microscope size={24} />,
      delay: 0,
    },
    {
      title: areas.crystal?.title ?? "",
      content: areas.crystal?.content ?? "",
      icon: <GemStone size={24} />,
      delay: 0.1,
    },
    {
      title: areas.geographic?.title ?? "",
      content: areas.geographic?.content ?? "",
      icon: <Map size={24} />,
      delay: 0.2,
    },
    {
      title: areas.ethical?.title ?? "",
      content: areas.ethical?.content ?? "",
      icon: <Scale size={24} />,
      delay: 0.3,
    }
  ].filter(area => area.title && area.content); // pour éviter les cartes vides

  return (
    <section id="research" className="py-24 relative bg-gradient-to-b from-emerald/5 to-offwhite/80 dark:from-emerald-dark/10 dark:to-charcoal/80">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/937980/pexels-photo-937980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-fixed bg-center bg-cover opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-emerald-dark dark:text-emerald font-light tracking-wider">
            {t.title} <span className="font-medium">{t.subtitle}</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-8" />
          <p className="text-charcoal/80 dark:text-offwhite/80 leading-relaxed">
            {t.description}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {researchAreas.map((area, index) => (
            <ResearchCard
              key={index}
              title={area.title}
              content={area.content}
              icon={area.icon}
              delay={area.delay}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a 
            href="#gallery" 
            className="inline-block px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-offwhite transition-all font-sans uppercase tracking-widest text-sm gem-cursor"
          >
            {t.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
