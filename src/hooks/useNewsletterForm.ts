// hooks/useNewsletterForm.ts
import { useState } from 'react';

export function useNewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error' | 'duplicate'>(null);

  const submit = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('https://n8n-hx5y.onrender.com/webhook/newsletter-subscribe', {
        method: 'POST',
        mode: 'cors', // Explicitement activer CORS
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
        });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setEmail('');
      } else if (data.message === 'Adresse déjà enregistrée.') {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, status, submit };
}
