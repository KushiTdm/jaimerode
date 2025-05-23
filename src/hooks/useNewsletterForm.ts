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
    const res = await fetch('https://n8n-hx5y.onrender.com/webhook/newsletter-subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
});

if (!res.ok) {
  setStatus('error');
  return;
}

const data = await res.json();
console.log('RESPONSE =', data);

// N8N doit renvoyer un objet du style : { success: true, status: 'success' | 'duplicate' }

if (data.status === 'duplicate') {
  setStatus('duplicate');
} else if (data.success) {
  setStatus('success');
} else {
  setStatus('error');
}


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
