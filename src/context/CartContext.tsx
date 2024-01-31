'use client';

import { CartProductType, ProductType } from "@/types/product";
import { createContext, useState, ReactNode } from "react";

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

export default function CartProvider({ children } : {
    children: ReactNode
}) {
    const [productList, setProductList] = useState<ProductType[]>([]);
    const [cart, setCart] = useState<CartProductType[]>([]);

    function addToCart (product: CartProductType) {
        const index =  cart.findIndex((item) => item.id === product.id)

        if (index !== -1) {
            const tempCart = [...cart];
            tempCart[index].quantity += product.quantity
            setCart(tempCart);
            return;
        }
        else {
            setCart([...cart, product]);
            return;
        }
    }

    function deleteFromCart (id: number) {
        setCart((prevCart) => {
            return [...prevCart.filter((product) => product.id !== id)]
        });
    }

    return (
        <CartContext.Provider value={{productList, cart, addToCart, deleteFromCart}}>
            {children}
        </CartContext.Provider>
    );
}