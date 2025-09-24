import type { ProductModelServices } from "./product-model-services";

export type ProductModel = {
  id?: number;
  product_id?: number;
  name?: string;
  description?: string;
  prices?: ProductModelServices[];
  created_at?: Date;
  updated_at?: Date;
};
