import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const Gallery: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const galleryImages: GalleryImage[] = [
    { src: "/images/panjshirER.jpg", alt: "Raw emerald specimen", caption: "" },
    { src: "/images/panjshirE.png", alt: "Panjshir emerald on velvet", caption: "" },
    { src: "/images/gem3.jpg", alt: "emerald", caption: "" },
    { src: "/images/panjshirrough.jpg", alt: "Emerald under microscope", caption: "" },
    { src: "/images/RoughGems.jpg", alt: "Natural crystal formation", caption: "" },
    { src: "/images/roughgemslot.jpg", alt: "Emerald mining process", caption: "" },
  ];

  return (
    <section id="gallery" className="py-24 bg-charcoal dark:bg-black text-offwhite">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-emerald font-light tracking-wider">
            {t.gallery.title} <span className="font-medium">{t.gallery.subtitle}</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-8" />
          <p className="text-offwhite/80 leading-relaxed">
            {t.gallery.description}
          </p>
        </motion.div>

        {/* Mobile: carrousel horizontal */}
        <div className="sm:hidden flex overflow-x-auto space-x-4 snap-x snap-mandatory">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="min-w-[75%] flex-shrink-0 rounded-lg overflow-hidden snap-center relative cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-56 object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-transparent to-transparent px-4 py-2">
                <p className="text-white text-sm font-serif">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: grille */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index}
              className="overflow-hidden rounded-lg cursor-pointer group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-serif">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modale plein écran */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            key="modal"
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-gold"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div 
              className="max-w-4xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
              <div className="mt-4 text-center">
                <p className="text-white font-serif">{selectedImage.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
