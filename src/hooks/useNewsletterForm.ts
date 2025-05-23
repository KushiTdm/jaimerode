// hooks/useNewsletterForm.ts
import { useState } from 'react';

export function useNewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error' | 'duplicate'>(null);

  const submit = async () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus('error');
    return;
  }

  setLoading(true);
  setStatus(null);

  try {
    const res = await fetch('/api/newsletter-subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
});

const text = await res.text();
console.log('RESPONSE =', text);

  } catch (error: unknown) { // Ici on type explicitement error comme unknown
    let errorMessage = 'Erreur inconnue';
    
    // Vérification type-safe de l'erreur
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    console.error('Erreur de soumission:', errorMessage);
    setStatus('error');
  } finally {
    setLoading(false);
  }
};


  return { email, setEmail, loading, status, submit };
}
