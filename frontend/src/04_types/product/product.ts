import type { ProductAttachment } from './product-attachment';

export type Product = {
  id?: number;
  category?: string;
  brand?: string;
  description?: string;
  attachments?: ProductAttachment[];
  name?: string;
  created_at?: Date;
  updated_at?: Date;
};
