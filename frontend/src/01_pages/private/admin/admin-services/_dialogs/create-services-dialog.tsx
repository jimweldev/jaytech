import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { mainInstance } from '@/07_instances/main-instance';
import FileDropzone from '@/components/dropzone/file-dropzone';
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
import { Textarea } from '@/components/ui/textarea';
import { handleRejectedFiles } from '@/lib/react-dropzone/handle-rejected-files';
import { mergeUniqueFiles } from '@/lib/react-dropzone/merge-unique-files';

type CreateServicesDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
};

// Zod schema to validate the form input
const ServicesSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  description: z.string().optional(),
  type: z.string().min(1, {
    message: 'Type is required',
  }),
  // icon: z.array(z.instanceof(File)),
});

const CreateServicesDialog = ({
  open,
  setOpen,
  refetch,
}: CreateServicesDialogProps) => {
  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof ServicesSchema>>({
    resolver: zodResolver(ServicesSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'default',
      // icon: [],
    },
  });

  // Track loading state for submit button
  const [isLoadingCreateItem, setIsLoadingCreateItem] = useState(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof ServicesSchema>) => {
    setIsLoadingCreateItem(true);

    // Send POST request and show toast notifications
    toast.promise(mainInstance.post(`/services`, data), {
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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Dialog header */}
              <DialogHeader>
                <DialogTitle>Add Services</DialogTitle>
              </DialogHeader>

              {/* Dialog body */}
              <DialogBody>
                <div className="grid grid-cols-12 gap-3">
                  {/* <FormField
                    control={form.control}
                    name="icon"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <FileDropzone
                            isInvalid={fieldState.invalid}
                            // setFiles={field.onChange}
                            files={field.value}
                            onDrop={(acceptedFiles, rejectedFiles) => {
                              const mergedFiles = mergeUniqueFiles(
                                field.value,
                                acceptedFiles,
                              );

                              field.onChange(mergedFiles);
                              handleRejectedFiles(rejectedFiles);
                            }}
                            onRemove={(fileToRemove: File) => {
                              field.onChange(
                                field.value.filter(
                                  file => file !== fileToRemove,
                                ),
                              );
                            }}
                            isMultiple
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

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

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                  Close
                </Button>
                <Button type="submit" disabled={isLoadingCreateItem}>
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateServicesDialog;
