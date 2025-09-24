import { useState, type FormEvent } from 'react';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import useProductModelStore from '@/05_stores/product/product-model-store';
import { mainInstance } from '@/07_instances/main-instance';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';

type DeleteModelDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
};

const DeleteModelDialog = ({
  open,
  setOpen,
  refetch,
}: DeleteModelDialogProps) => {
  const { selectedProductModel } = useProductModelStore();

  // Track loading state for submit button
  const [isLoadingDeleteItem, setIsLoadingDeleteItem] =
    useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoadingDeleteItem(true);

    // Send DELETE request and show toast notifications
    toast.promise(mainInstance.delete(`/models/${selectedProductModel?.id}`), {
      loading: 'Loading...',
      success: () => {
        refetch();
        setOpen(false);
        return 'Success!';
      },
      error: error => {
        // Display error message from response or fallback
        return (
          error.response?.data?.message || error.message || 'An error occurred'
        );
      },
      finally: () => {
        setIsLoadingDeleteItem(false); // Reset loading state
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {/* Form */}
          <form onSubmit={onSubmit}>
            {/* Dialog body */}
            <DialogBody>
              {/* Warning icon */}
              <CircleAlert
                className="text-destructive mx-auto mb-4"
                size={64}
              />

              {/* Modal title */}
              <h3 className="text-center text-xl">Delete Product</h3>
              <p className="text-muted-foreground mb-2 text-center">
                Are you sure you want to delete this record?
              </p>

              {/* Item */}
              <h2 className="text-center text-2xl font-semibold">
                {selectedProductModel?.name}
              </h2>
            </DialogBody>

            {/* Modal footer */}
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                type="submit"
                disabled={isLoadingDeleteItem}
              >
                Delete
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteModelDialog;
