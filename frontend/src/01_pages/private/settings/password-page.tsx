import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { mainInstance } from '@/07_instances/main-instance';
import PasswordInput from '@/components/input/password-input';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Validate password fields using Zod
const FormSchema = z
  .object({
    current_password: z.string().min(1, {
      message: 'Required',
    }),
    new_password: z.string().min(1, {
      message: 'Required',
    }),
    confirm_new_password: z.string().min(1, {
      message: 'Required',
    }),
  })
  // Ensure new passwords match
  .refine(data => data.new_password === data.confirm_new_password, {
    message: 'Passwords do not match',
    path: ['confirm_new_password'],
  });

const PasswordPage = () => {
  // Initialize form with validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  // Loading state for password change operation
  const [isLoadingChangePassword, setIsLoadingChangePassword] =
    useState<boolean>(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoadingChangePassword(true);

    // Show toast notifications during password change
    toast.promise(mainInstance.patch(`/settings/change-password`, data), {
      loading: 'Loading...',
      success: () => {
        form.reset();
        return 'Success!';
      },
      error: error => {
        return (
          error.response?.data?.message || error.message || 'An error occurred'
        );
      },
      finally: () => {
        setIsLoadingChangePassword(false);
      },
    });
  };

  return (
    <>
      <PageHeader className="mb-3">Password</PageHeader>

      <Card className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardBody className="space-y-layout">
              <div className="gap-layout grid grid-cols-12">
                {/* Current password field */}
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* New password field */}
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm new password field */}
                <FormField
                  control={form.control}
                  name="confirm_new_password"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form footer with save button */}
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoadingChangePassword}>
                  Submit
                </Button>
              </div>
            </CardBody>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default PasswordPage;
