import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { mainInstance } from '@/07_instances/main-instance';
import CheckoutForm from '@/components/stripe/checkout-form';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string,
);

// Component Props
type ConfirmPaymentDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  clientSecret: string;
  orderDetails: any;
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
          <CheckoutForm orderDetails={orderDetails} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPaymentDialog;
