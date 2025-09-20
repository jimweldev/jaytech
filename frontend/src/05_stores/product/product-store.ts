import { create } from 'zustand';
import type { Product } from '@/04_types/product/product';

// Define the store
type ProductStoreProps = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
};

// Create the store
const useProductStore = create<ProductStoreProps>(set => ({
  selectedProduct: null,
  setSelectedProduct: (product: Product | null) =>
    set({ selectedProduct: product }),
}));

export default useProductStore;
