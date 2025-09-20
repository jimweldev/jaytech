// CheckoutForm.tsx
import React, { useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FaCircleExclamation } from 'react-icons/fa6';
import { Alert, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { DialogBody, DialogFooter } from '../ui/dialog';

type PaymentButtonProps = { orderDetails: any };

const CheckoutForm = ({ orderDetails }: PaymentButtonProps) => {
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
    <form onSubmit={handleSubmit}>
      <DialogBody>
        {message ? (
          <Alert className="mb-layout" variant="destructive">
            <FaCircleExclamation />
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        ) : null}

        <PaymentElement />
      </DialogBody>

      <DialogFooter className="flex justify-end">
        <Button type="submit" disabled={!stripe || loading}>
          {loading
            ? 'Processing...'
            : orderDetails?.amount
              ? `Pay €${orderDetails?.amount / 100}`
              : 'Pay'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CheckoutForm;
