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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // Timeout après 10s

    const res = await fetch('/api/newsletter-subscribe', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: email.trim() }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    // Vérifiez d'abord si la réponse est vide
    const responseText = await res.text();
    if (!responseText) {
      throw new Error('Empty response from server');
    }

    // Essayez de parser le JSON seulement si la réponse n'est pas vide
    const data = JSON.parse(responseText);

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Request failed');
    }

    setStatus('success');
    setEmail('');
  } catch (err) {
    console.error('API Error:', err);
    setStatus(
      err.message.includes('déjà') || err.message.includes('déjà') 
        ? 'duplicate' 
        : 'error'
    );
  } finally {
    setLoading(false);
  }
};

  return { email, setEmail, loading, status, submit };
}
