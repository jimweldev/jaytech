import { useState } from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FaCircleExclamation } from 'react-icons/fa6';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string,
);

type ConfirmPaymentDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  clientSecret: string;
  orderDetails: any;
};

const ConfirmPaymentForm = ({ orderDetails }: { orderDetails: any }) => {
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

const ConfirmPaymentDialog = ({
  open,
  setOpen,
  clientSecret,
  orderDetails,
}: ConfirmPaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={true}>
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <ConfirmPaymentForm orderDetails={orderDetails} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPaymentDialog;
