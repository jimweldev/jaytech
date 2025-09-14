import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useTaskStore from '@/05_stores/task-store';
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
  name: z.string().min(1, {
    message: 'Required',
  }),
});

// Component Props
type UpdateTaskDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const UpdateTaskDialog = ({
  open,
  setOpen,
  refetch,
}: UpdateTaskDialogProps) => {
  // Access store values
  const { selectedTask } = useTaskStore();

  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });

  // Populate form with selected items's data
  useEffect(() => {
    if (selectedTask) {
      form.reset({
        name: selectedTask.name || '',
      });
    }
  }, [selectedTask, form]);

  // Track loading state for submit button
  const [isLoadingUpdateItem, setIsLoadingUpdateItem] =
    useState<boolean>(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoadingUpdateItem(true);

    // Send PATCH request and show toast notifications
    toast.promise(mainInstance.patch(`/tasks/${selectedTask?.id}`, data), {
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
        setIsLoadingUpdateItem(false); // Reset loading state
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Update Task</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* Name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Name</FormLabel>
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
              <Button type="submit" disabled={isLoadingUpdateItem}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskDialog;
