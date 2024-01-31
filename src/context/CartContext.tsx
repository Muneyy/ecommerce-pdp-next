// "use client"

import { CartProductType, ProductType } from "@/types/product";
import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

type CartContextType = {
  productList: ProductType[];
  cart: CartProductType[];
  addToCart: (product: CartProductType) => void;
  deleteFromCart: (id: number) => void;
};

export const CartContext = createContext<CartContextType>({
  productList: [],
  cart: [],
  addToCart: (product: CartProductType) => {},
  deleteFromCart: (id: number) => {},
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartProductType[]>([]);

  const addToCart = useCallback((product: CartProductType) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        const tempCart = [...prevCart];
        tempCart[index].quantity += product.quantity;
        return tempCart;
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
    () => ({ productList, cart, addToCart, deleteFromCart }),
    [productList, cart, addToCart, deleteFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
