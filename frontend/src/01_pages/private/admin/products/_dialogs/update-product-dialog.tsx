import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import useProductStore from '@/05_stores/product/product-store';
import { mainInstance } from '@/07_instances/main-instance';
import FileDropzone from '@/components/dropzone/file-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';
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
import AddProductModel from './_components/product-model-section';

type UpdateProductDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

// Zod schema to validate the form input
const ProductSchema = z.object({
  category: z.string().min(1, {
    message: 'Required',
  }),
  name: z.string().min(1, {
    message: 'Required',
  }),
  brand: z.string().min(1, {
    message: 'Required',
  }),
  description: z.string().min(1, {
    message: 'Required',
  }),
  attachments: z.array(z.instanceof(File)),
});

const UpdateProductDialog = ({
  open,
  setOpen,
  refetch,
}: UpdateProductDialogProps) => {
  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      category: '',
      brand: '',
      description: '',
      attachments: [],
    },
  });

  const { selectedProduct } = useProductStore();

  // Populate form with selected items's data
  useEffect(() => {
    if (selectedProduct) {
      const files: File[] = (selectedProduct.attachments ?? []).map(
        a => new File([], a.file_name ?? 'unknown'), // you could fetch blob data if needed
      );

      form.reset({
        category: selectedProduct.category || '',
        name: selectedProduct.name || '',
        brand: selectedProduct.brand || '',
        description: selectedProduct.description || '',
        attachments: files,
      });
    }
  }, [selectedProduct, form]);

  // Track loading state for submit button
  const [isLoadingUpdateItem, setIsLoadingUpdateItem] =
    useState<boolean>(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    setIsLoadingUpdateItem(true);

    // Send PUT request and show toast notifications
    toast.promise(
      mainInstance.patch(`/products/${selectedProduct?.id}`, data),
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
      <DialogContent size="xxl">
        {/* Dialog header */}
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>

        {/* Dialog body */}
        <DialogBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardBody>
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

                    <div className="col-span-12 flex items-center justify-between gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="col-span-12 w-full">
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
                        name="category"
                        render={({ field }) => (
                          <FormItem className="col-span-12 w-full">
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem className="col-span-12 w-full">
                            <FormLabel>Brand Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                    <div className="col-span-12 flex justify-end">
                      <Button
                        className="text-right"
                        size="sm"
                        disabled={isLoadingUpdateItem}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </form>
          </Form>

          {selectedProduct && <AddProductModel product={selectedProduct} />}
        </DialogBody>

        {/* Dialog footer */}
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialog;
