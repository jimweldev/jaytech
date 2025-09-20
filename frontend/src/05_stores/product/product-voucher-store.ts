import { create } from 'zustand';
import type { ProductVouchers } from '@/04_types/product/product-vouchers';

// Define the store
type ProductVoucherStoreProps = {
  selectedProductVoucher: ProductVouchers | null;
  setSelectedProductVoucher: (product: ProductVouchers | null) => void;
};

// Create the store
const useProductVoucherStore = create<ProductVoucherStoreProps>(set => ({
  selectedProductVoucher: null,
  setSelectedProductVoucher: (product: ProductVouchers | null) =>
    set({ selectedProductVoucher: product }),
}));

export default useProductVoucherStore;
