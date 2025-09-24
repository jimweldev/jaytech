import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import useProductVoucherStore from '@/05_stores/product/product-voucher-store';
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
import useProductModelStore from '@/05_stores/product/product-model-store';
import FileDropzone from '@/components/dropzone/file-dropzone';
import { mergeUniqueFiles } from '@/lib/react-dropzone/merge-unique-files';
import { handleRejectedFiles } from '@/lib/react-dropzone/handle-rejected-files';
import { Textarea } from '@/components/ui/textarea';
import ProductModelServicesSelect from '@/components/react-select/product-model-services-select';

type UpdateModelDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

// Zod schema to validate the form input
const ModelSchema = z.object({
  product_id: z.number().int().min(1, { message: 'Required' }),
  name: z.string().min(1, { message: 'Required' }),
  description: z.string(),
  // attachments: z.array(z.instanceof(File)),
  variants: z.array(
    z.object({
      option: z.object({
        value: z.number().int(),   // number
        label: z.string(),         // string
      }),
      price: z.number().or(z.string()), // depending on your schema
    })
  )
});

const UpdateModelDialog = ({
  open,
  setOpen,
  refetch,
}: UpdateModelDialogProps) => {
  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof ModelSchema>>({
    resolver: zodResolver(ModelSchema),
    defaultValues: {
      product_id: 0,
      name: '',
      description: '',
      // attachments: [],
      variants: [{ option: { value: 0, label: '' }, price: '' }],
    },
  });

  const { selectedProductModel } = useProductModelStore();

  // Populate form with selected items's data
  useEffect(() => {
    if (selectedProductModel) {
      form.reset({
        product_id: selectedProductModel.product_id,
        name: selectedProductModel.name ?? '',
        description: selectedProductModel.description ?? '',
        // attachments: selectedProductModel.attachments ?? [],
        variants: selectedProductModel?.prices?.map(price => ({
          option: {
            // your ProductModelServicesSelect expects value + label
            value: price.id,          // or price.name if your select needs a string
            label: price.name,
          },
          price: price.price,         // keep as string if your schema expects string
        })),
      });
    }
  }, [selectedProductModel, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  // Track loading state for submit button
  const [isLoadingUpdateItem, setIsLoadingUpdateItem] =
    useState<boolean>(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof ModelSchema>) => {
    setIsLoadingUpdateItem(true);

    // Send PUT request and show toast notifications
    toast.promise(
      mainInstance.patch(`/models/${selectedProductModel?.id}`, data),
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
          setIsLoadingUpdateItem(false); // Reset loading state
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Update Product</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* <FormField
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

export default UpdateModelDialog;
