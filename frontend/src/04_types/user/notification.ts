export type Notification = {
  id?: number;
  user_id?: number;
  type?: string;
  title?: string;
  message?: string;
  content?: string;
  link?: string;
  is_read?: boolean;
  created_at?: Date;
  updated_at?: Date;
};
