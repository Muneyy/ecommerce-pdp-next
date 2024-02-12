// type CartContextType and CartContext are
// expecting the product and id inputs to be used
// inside the function
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

"use client";

import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { CartProductType, ProductType } from "@/types/productTypes";

type CartContextType = {
  cart: CartProductType[];
  addToCart: (product: CartProductType) => void;
  deleteFromCart: (id: number) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: (product: CartProductType) => {},
  deleteFromCart: (id: number) => {},
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartProductType[]>([]);

  const addToCart = useCallback((product: CartProductType) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        return prevCart.map((item, i) => (i === index
          ? {
            ...item,
            quantity: item.quantity + product.quantity,
          }
          : item));
      }
      return [...prevCart, product];
    });
  }, []);

  const deleteFromCart = useCallback((id: number) => {
    setCart((prevCart) => {
      return [...prevCart.filter((product) => product.id !== id)];
    });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      deleteFromCart,
    }),
    [cart, addToCart, deleteFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
