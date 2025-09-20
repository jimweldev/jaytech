import { create } from 'zustand';
import type { ProductBooking } from '@/04_types/product/product-booking';

// Define the store
type ProductBookingStoreProps = {
  selectedProductBooking: ProductBooking | null;
  setSelectedProductBooking: (product: ProductBooking | null) => void;
};

// Create the store
const useProductBookingStore = create<ProductBookingStoreProps>(set => ({
  selectedProductBooking: null,
  setSelectedProductBooking: (product: ProductBooking | null) =>
    set({ selectedProductBooking: product }),
}));

export default useProductBookingStore;
