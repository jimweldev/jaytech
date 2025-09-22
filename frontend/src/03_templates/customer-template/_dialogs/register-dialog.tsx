import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useAuthUserStore from '@/05_stores/_common/auth-user-store';
import { publicInstance } from '@/07_instances/public-instance';
import PasswordInput from '@/components/input/password-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
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

// ✅ Zod schema to validate the form input
const FormSchema = z
  .object({
    first_name: z.string().min(1, { message: 'First name is required' }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    suffix: z.string().optional(),
    email: z.email({
      message: 'Invalid email',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
    confirm_password: z.string().min(1, {
      message: 'Please confirm your password',
    }),
    referral_code: z.string().optional(),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

// ✅ Component Props
type RegisterDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const RegisterDialog = ({ open, setOpen }: RegisterDialogProps) => {
  const { setAuthUser } = useAuthUserStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      suffix: '',
      email: '',
      password: '',
      confirm_password: '',
      referral_code: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    toast.promise(publicInstance.post('/auth/register', data), {
      loading: 'Loading...',
      success: response => {
        setAuthUser(response.data.user, response.data.access_token);
        setOpen(false); // close dialog after success
        return `Registered successfully!`;
      },
      error: error => {
        return (
          error.response?.data?.message || error.message || 'An error occurred'
        );
      },
      finally: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={true}>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Register</DialogTitle>
              <DialogDescription>
                Fill out the form below to register
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Middle Name */}
                <FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <FormItem className="col-span-5">
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="col-span-5">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Suffix */}
                <FormField
                  control={form.control}
                  name="suffix"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Suffix</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="me@example.com"
                          {...field}
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} autoComplete="new-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} autoComplete="new-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Referral Code */}
                <FormField
                  control={form.control}
                  name="referral_code"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Referral Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>

            <DialogFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
