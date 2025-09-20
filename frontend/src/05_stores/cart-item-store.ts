import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItemsStoreProps = {
  cartItems: CartItem[];
  selectedCartItem: CartItem | null;
  setCartItems: (cartItems: CartItem[]) => void;
  removeCartItem: (id: number) => void;
  setSelectedCartItem: (cartItem: CartItem) => void;
};

const useCartItemsStore = create<CartItemsStoreProps>()(
  persist(
    set => ({
      cartItems: [
        {
          id: 1,
          name: 'Product 1',
          price: 500.99,
          image: '/images/product1.jpg',
        },
        {
          id: 2,
          name: 'Product 2',
          price: 600,
          image: '/images/product2.jpg',
        },
        {
          id: 3,
          name: 'Product 3',
          price: 700,
          image: '/images/product3.jpg',
        },
      ],
      selectedCartItem: null,
      setCartItems: cartItems => set({ cartItems }),
      removeCartItem: id =>
        set(state => ({
          cartItems: state.cartItems.filter(item => item.id !== id),
        })),
      setSelectedCartItem: cartItem => set({ selectedCartItem: cartItem }),
    }),
    {
      name: 'cart-items-store',
    },
  ),
);

export default useCartItemsStore;
