// hooks/useNewsletterForm.ts
import { useState } from 'react';

export function useNewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error' | 'duplicate'>(null);

  const submit = async () => {
  try {
    const res = await fetch('/api/newsletter-subscribe', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Request-Source': 'web-form'
      },
      body: JSON.stringify({ 
        email: email.trim(),
        _timestamp: Date.now() // Anti-cache
      })
    });

    if (res.status === 204) {
      throw new Error('204 No Content');
    }

    const text = await res.text();
    if (!text) {
      throw new Error('Empty response');
    }

    const data = JSON.parse(text);
    if (!data?.success) {
      throw new Error(data?.message || 'Invalid response');
    }

    setStatus('success');
  } catch (err) {
    console.error('API Error:', err.message);
    setStatus('error');
  }
};

  return { email, setEmail, loading, status, submit };
}
