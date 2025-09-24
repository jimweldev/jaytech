import type { User } from '../user/user';

export type ProductBooking = {
  id?: number;
  customer_id?: number;
  tracking_year?: number;
  tracking_sequence?: number;
  image?: string;
  label?: string;
  amount?: string;
  status?: string;
  address?: string;
  contact_number?: string;
  booking_date?: Date;
  booking_time?: Date;
  created_at?: Date;
  updated_at?: Date;
  customer?: User;
};
