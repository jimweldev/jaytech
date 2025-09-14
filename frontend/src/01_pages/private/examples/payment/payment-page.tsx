// PaymentPage.tsx
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { mainInstance } from '@/07_instances/main-instance';
import CheckoutForm from '@/components/stripe/checkout-form';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string,
);

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    const { data } = await mainInstance.post('/tasks/create-payment-intent', {
      amount: 2500,
      description: 'Order #12345',
    });
    setClientSecret(data.clientSecret);
    setLoading(false);
  };

  return (
    <div>
      {!clientSecret ? (
        <Button onClick={startPayment} disabled={loading}>
          {loading ? 'Preparing...' : 'Buy'}
        </Button>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
