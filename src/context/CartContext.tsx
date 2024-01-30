'use client';

import { CartProductType, ProductType } from "@/types/product";
import { createContext, useState, ReactNode } from "react";

type CartContextType = {
    productList: ProductType[];
    cart: CartProductType[];
    test: string;
    populateProductList: (fetchedProducts: ProductType[]) => void;
    addToCart: (product: CartProductType) => void;
    deleteFromCart: (id: number) => void;
  };
  
export const CartContext = createContext<CartContextType>({
    productList: [],
    cart: [],
    test: "test",
    populateProductList: (fetchedProducts: ProductType[]) => {},
    addToCart: (product: CartProductType) => {},
    deleteFromCart: (id: number) => {},
  });

export default function CartProvider({ children } : {
    children: ReactNode
}) {
    const [productList, setProductList] = useState<ProductType[]>([]);
    const [cart, setCart] = useState<CartProductType[]>([]);
    const [test, setTest] = useState<string>("test");

    function populateProductList (fetchedProducts: ProductType[]) {
        // TODO: fetch product list from API
        setProductList(fetchedProducts);
    }

    function addToCart (product: CartProductType) {
        // TODO: add product to cart
        const index =  cart.findIndex((item) => item.id === product.id)

        if (index !== -1) {
            cart[index].quantity += 1;
            setCart([...cart]);
            return;
        }
        else {
            setCart([...cart, product]);
            return;
        }
    }

    function deleteFromCart (id: number) {
        // TODO: delete product from cart
        setCart(cart.filter((product) => product.id !== id));
    }

    return (
    <CartContext.Provider value={{productList, cart, test, populateProductList, addToCart, deleteFromCart}}>
        {children}
    </CartContext.Provider>
    );
}