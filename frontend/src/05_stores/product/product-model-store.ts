import { create } from 'zustand';
import type { ProductModel } from '@/04_types/product/product-model';

// Define the store
type ProductModelStoreProps = {
  selectedProductModel: ProductModel | null;
  setSelectedProductModel: (product: ProductModel | null) => void;
};

// Create the store
const useProductModelStore = create<ProductModelStoreProps>(set => ({
  selectedProductModel: null,
  setSelectedProductModel: (product: ProductModel | null) =>
    set({ selectedProductModel: product }),
}));

export default useProductModelStore;
