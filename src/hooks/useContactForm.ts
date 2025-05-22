import { useState } from 'react';

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const sendForm = async (formData: { name: string; email: string; message: string }) => {
    setLoading(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '2857c34c-0f46-4088-8af7-563f02f8ac38',
          subject: 'Nouveau message de contact',
          ...formData
        }),
      });

      const json = await res.json();
      if (json.success) {
        setResponseMessage('Message envoyé avec succès !');
      } else {
        setResponseMessage("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      setResponseMessage("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, responseMessage, sendForm };
};
