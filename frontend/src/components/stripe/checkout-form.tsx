// CheckoutForm.tsx
import React, { useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Button } from '../ui/button';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe will redirect here after success/failure
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setMessage(error.message ?? 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded border p-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay €10'}
      </Button>
      {message && <p className="mt-2 text-red-600">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
