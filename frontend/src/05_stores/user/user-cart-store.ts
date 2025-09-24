import { create } from 'zustand';
import type { UserCart } from '@/04_types/user/user-cart';

// Define the store
type UserCartStoreProps = {
  selectedUserCart: UserCart | null;
  setSelectedUserCart: (userCart: UserCart | null) => void;
};

// Create the store
const useUserCartStore = create<UserCartStoreProps>(set => ({
  selectedUserCart: null,
  setSelectedUserCart: (userCart: UserCart | null) =>
    set({ selectedUserCart: userCart }),
}));

export default useUserCartStore;
