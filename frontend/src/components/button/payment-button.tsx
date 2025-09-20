// PaymentPage.tsx
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { mainInstance } from '@/07_instances/main-instance';
import CheckoutForm from '@/components/stripe/checkout-form';
import { Button } from '@/components/ui/button';
import ConfirmPaymentDialog from './_dialogs/confirm-payment-dialog';

type PaymentButtonProps = {
  endpoint: string;
  orderDetails: any;
  label?: string;
};

const PaymentButton = ({
  endpoint,
  orderDetails,
  label = 'Continue',
}: PaymentButtonProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    const { data } = await mainInstance.post(endpoint, orderDetails);
    setClientSecret(data.clientSecret);
    setLoading(false);
  };

  return (
    <div className="w-full">
      {!clientSecret ? (
        <div className="flex justify-end">
          <Button onClick={startPayment} disabled={loading}>
            {label}
          </Button>
        </div>
      ) : (
        <>
          <ConfirmPaymentDialog
            open={!!clientSecret}
            setOpen={setClientSecret}
            clientSecret={clientSecret}
            orderDetails={orderDetails}
          />
        </>
      )}
    </div>
  );
};

export default PaymentButton;
