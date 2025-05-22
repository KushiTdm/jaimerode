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

  try {
    const res = await fetch('/api/newsletter-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Erreur serveur');
    }

    const data = await res.json();
    
    if (data.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus(data.message?.includes('déjà') ? 'duplicate' : 'error');
    }
  } catch (err) {
    console.error('Erreur:', err);
    setStatus('error');
  } finally {
    setLoading(false);
  }
};

  return { email, setEmail, loading, status, submit };
}
