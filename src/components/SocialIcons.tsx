import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Atom as Tiktok, Twitter } from 'lucide-react';

const socialIcons = [
  {
    icon: <Instagram size={20} />,
    url: 'https://instagram.com',
    label: 'Instagram'
  },
  {
    icon: <Tiktok size={20} />,
    url: 'https://tiktok.com',
    label: 'TikTok'
  },
  // {
  //   icon: <Twitter size={20} />,
  //   url: 'https://twitter.com',
  //   label: 'Twitter'
  // }
];

const SocialIcons: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="flex flex-col space-y-3" 
      variants={container}
      initial="hidden"
      animate="show"
    >
      {socialIcons.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-offwhite dark:bg-charcoal shadow-lg border border-gold/20 text-gold hover:bg-gold hover:text-offwhite transition-all duration-300 social-icon"
          variants={item}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialIcons;