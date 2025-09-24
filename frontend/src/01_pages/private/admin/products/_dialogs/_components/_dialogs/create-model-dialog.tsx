import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';
import type { ProductModel } from '@/04_types/product/product-model';
import FileDropzone from '@/components/dropzone/file-dropzone';
import ProductModelServicesSelect from '@/components/react-select/product-model-services-select';
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
import { toast } from 'sonner';
import { mainInstance } from '@/07_instances/main-instance';

type CreateModelDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refetch: () => void;
  product?: ProductModel;
};

// Zod schema to validate the form input
const ProductModelSchema = z.object({
  product_id: z.number().int().min(1, { message: 'Required' }),
  name: z.string().min(1, { message: 'Required' }),
  description: z.string(),
  attachments: z.array(z.instanceof(File)),
  variants: z.array(
    z.object({
      option: z.object({
        value: z.number().int(),
        label: z.string().min(1)
      }),
      price: z.string().min(1, 'Enter price'),
    })
  )
});


const CreateModelDialog = ({
  open,
  setOpen,
  refetch,
  product,
}: CreateModelDialogProps) => {

  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof ProductModelSchema>>({
    resolver: zodResolver(ProductModelSchema),
    defaultValues: {
      product_id: product?.id,
      name: '',
      description: '',
      attachments: [],
      variants: [{ option: { value: 0, label: '' }, price: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  // Track loading state for submit button
  const [isLoadingCreateItem, setIsLoadingCreateItem] = useState(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof ProductModelSchema>) => {
    setIsLoadingCreateItem(true);

    // Send POST request and show toast notifications
    toast.promise(mainInstance.post(`/models`, data), {
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
                <DialogTitle>Add Device</DialogTitle>
              </DialogHeader>

              {/* Dialog body */}
              <DialogBody>
                <div className="grid grid-cols-12 gap-3">
                  <FormField
                    control={form.control}
                    name="attachments"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Images</FormLabel>
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
                  />

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

                  {/* dynamic field */}
                  <div className="col-span-12">
                    {fields.map((field, index) => (
                      <div key={field.id} className="mb-2 flex gap-2">
                        {/* Dropdown / select */}
                        <FormField
                          control={form.control}
                          name={`variants.${index}.option`}
                          render={({ field, fieldState }) => (
                            <FormItem className="w-80">
                              <FormControl>
                                <ProductModelServicesSelect
                                  placeholder="Select service"
                                  value={field.value ?? null}
                                  onChange={(option: { value: string; label: string } | null) =>
                                    field.onChange(option)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Price input */}
                        <FormField
                          control={form.control}
                          name={`variants.${index}.price`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Enter Price" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Remove button */}
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          –
                        </Button>
                      </div>
                    ))}

                    {/* Add new row */}
                    <Button
                      type="button"
                      onClick={() => append({ option: { value: 0, label: '' }, price: '' })}
                    >
                      + Add Field
                    </Button>
                  </div>
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

export default CreateModelDialog;
