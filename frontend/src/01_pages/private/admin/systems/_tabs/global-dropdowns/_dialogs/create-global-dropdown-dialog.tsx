import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { mainInstance } from '@/07_instances/main-instance';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Zod schema to validate the form input
const FormSchema = z.object({
  label: z.string().min(1, {
    message: 'Required',
  }),
  module: z.string().min(1, {
    message: 'Required',
  }),
  type: z.string().min(1, {
    message: 'Required',
  }),
});

// Component Props
type CreateGlobalDropdownDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const CreateGlobalDropdownDialog = ({
  open,
  setOpen,
  refetch,
}: CreateGlobalDropdownDialogProps) => {
  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: '',
      module: '',
      type: '',
    },
  });

  // Track loading state for submit button
  const [isLoadingCreateItem, setIsLoadingCreateItem] = useState(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoadingCreateItem(true);

    // Send POST request and show toast notifications
    toast.promise(mainInstance.post(`/system/global-dropdowns`, data), {
      loading: 'Loading...',
      success: () => {
        form.reset();
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
        setIsLoadingCreateItem(false); // Reset loading state
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={true}>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Create Global Dropdown</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* Label field */}
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Module field */}
                <FormField
                  control={form.control}
                  name="module"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Module</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Type field */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>

            {/* Dialog footer */}
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoadingCreateItem}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGlobalDropdownDialog;
