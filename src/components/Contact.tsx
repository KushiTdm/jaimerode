import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AtSign, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Form state simple
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu peux ajouter une action (ex: API call)
    alert(`${t.contact.form.submit}:\n${JSON.stringify(form, null, 2)}`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-offwhite dark:bg-charcoal relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-charcoal to-transparent dark:from-black opacity-5"></div>

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-emerald-dark dark:text-emerald font-light tracking-wider">
            {t.contact.title} <span className="font-medium">{t.contact.subtitle}</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto mb-8" />
          <p className="text-charcoal/80 dark:text-offwhite/80 mb-6 leading-relaxed">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              {/* Téléphone */}
              <div className="flex items-start space-x-4">
                <div className="text-gold p-2 rounded-full bg-offwhite dark:bg-charcoal border border-gold/20">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2 text-emerald-dark dark:text-emerald">{t.contact.phone.title}</h3>
                  <p className="text-charcoal/80 dark:text-offwhite/80">
                    {t.contact.phone.number}<br />
                    {t.contact.phone.hours}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="text-gold p-2 rounded-full bg-offwhite dark:bg-charcoal border border-gold/20">
                  <AtSign size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2 text-emerald-dark dark:text-emerald">{t.contact.email.title}</h3>
                  {t.contact.email.addresses.map((address, i) => (
                    <p key={i} className="text-charcoal/80 dark:text-offwhite/80">{address}</p>
                  ))}
                </div>
              </div>

              {/* Telegram */}
              <div className="flex items-start space-x-4">
                <div className="text-gold p-2 rounded-full bg-offwhite dark:bg-charcoal border border-gold/20">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2 text-emerald-dark dark:text-emerald">{t.contact.telegram.title}</h3>
                  <p className="text-charcoal/80 dark:text-offwhite/80 mb-3">{t.contact.telegram.description}</p>
                  <a
                    href="https://t.me/emeraldelegance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-dark text-white hover:bg-gold transition-colors rounded-md font-sans text-sm gem-cursor"
                  >
                    {t.contact.telegram.cta}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-6"
            >
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.contact.form.name}
                required
                className="w-full px-4 py-3 rounded border border-charcoal/30 dark:border-offwhite/30 bg-white dark:bg-charcoal text-charcoal dark:text-offwhite placeholder-charcoal/50 dark:placeholder-offwhite/50 focus:outline-none focus:ring-2 focus:ring-emerald"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t.contact.form.email}
                required
                className="w-full px-4 py-3 rounded border border-charcoal/30 dark:border-offwhite/30 bg-white dark:bg-charcoal text-charcoal dark:text-offwhite placeholder-charcoal/50 dark:placeholder-offwhite/50 focus:outline-none focus:ring-2 focus:ring-emerald"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t.contact.form.message}
                required
                rows={5}
                className="w-full px-4 py-3 rounded border border-charcoal/30 dark:border-offwhite/30 bg-white dark:bg-charcoal text-charcoal dark:text-offwhite placeholder-charcoal/50 dark:placeholder-offwhite/50 focus:outline-none focus:ring-2 focus:ring-emerald resize-none"
              />
              <button
                type="submit"
                className="w-full bg-emerald-dark text-white py-3 rounded hover:bg-gold transition-colors font-semibold"
              >
                {t.contact.form.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
