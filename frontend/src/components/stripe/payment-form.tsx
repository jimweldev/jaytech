import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { mainInstance } from '@/07_instances/main-instance';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create payment intent when component mounts
    createPaymentIntent();
  }, [amount]);

  const createPaymentIntent = async () => {
    try {
      //   const response = await fetch(
      //     'http://localhost:8000/api/create-payment-intent',
      //     {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: `Bearer ${localStorage.getItem('token')}`, // if using auth
      //       },
      //       body: JSON.stringify({
      //         amount: amount,
      //         currency: 'usd',
      //       }),
      //     },
      //   );
      const response = await mainInstance
        .post('/tasks/create-payment-intent')
        .then(res => {
          console.log('PaymentIntent response:', res.data);
          setClientSecret(res.data.clientSecret);
        });
    } catch (err) {
      setError('Failed to create payment intent');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>

      {error && <div className="error">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading || !clientSecret}
        className="pay-button"
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default PaymentForm;
