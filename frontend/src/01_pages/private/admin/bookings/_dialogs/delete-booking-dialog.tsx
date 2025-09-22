import { useState, type FormEvent } from 'react';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import useProductBookingStore from '@/05_stores/product/product-booking-store';
import { mainInstance } from '@/07_instances/main-instance';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';

type DeleteBookingDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
};

const DeleteBookingDialog = ({
  open,
  setOpen,
  refetch,
}: DeleteBookingDialogProps) => {
  const { selectedProductBooking } = useProductBookingStore();

  // Track loading state for submit button
  const [isLoadingDeleteItem, setIsLoadingDeleteItem] =
    useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoadingDeleteItem(true);

    // Send DELETE request and show toast notifications
    toast.promise(
      mainInstance.delete(`/bookings/${selectedProductBooking?.id}`),
      {
        loading: 'Loading...',
        success: () => {
          refetch();
          setOpen(false);
          return 'Success!';
        },
        error: error => {
          // Display error message from response or fallback
          return (
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingDeleteItem(false); // Reset loading state
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* Form */}
        <form onSubmit={onSubmit}>
          {/* Dialog body */}
          <DialogBody>
            {/* Warning icon */}
            <CircleAlert className="text-destructive mx-auto mb-4" size={64} />

            {/* Modal title */}
            <h3 className="text-center text-xl">Cancel Booking</h3>
            <p className="text-muted-foreground mb-2 text-center">
              Are you sure you want to cancel this booking?
            </p>

            {/* Item */}
            <h2 className="text-center text-2xl font-semibold">
              {selectedProductBooking?.customer?.first_name}{' '}
              {selectedProductBooking?.customer?.last_name}
            </h2>
          </DialogBody>

          {/* Modal footer */}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              type="submit"
              disabled={isLoadingDeleteItem}
            >
              Cancel Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookingDialog;
