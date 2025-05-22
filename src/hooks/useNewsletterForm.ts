// hooks/useNewsletterForm.ts
import { useState } from 'react';

export function useNewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error' | 'duplicate'>(null);

  const submit = async () => {
  try {
    setLoading(true); // ← important
    const res = await fetch('/api/newsletter-subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Source': 'web-form'
      },
      body: JSON.stringify({
        email: email.trim(),
        _timestamp: Date.now()
      })
    });

    console.log('Status:', res.status); // ← log utile
    const text = await res.text();
    console.log('Response text:', text); // ← inspecter ici

    if (res.status === 204) {
      throw new Error('204 No Content');
    }

    if (!text) {
      throw new Error('Empty response');
    }

    const data = JSON.parse(text);
    if (!data?.success) {
      throw new Error(data?.message || 'Invalid response');
    }

    setStatus('success');
  } catch (err: any) {
    console.error('API Error:', err.message);
    setStatus('error');
  } finally {
    setLoading(false);
  }
};


  return { email, setEmail, loading, status, submit };
}
