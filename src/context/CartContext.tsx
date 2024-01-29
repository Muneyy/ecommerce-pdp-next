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
    const [cart, setCart] = useState<CartProductType[]>([{
        id: 1,
        company: "Example Company",
        title: "Example Product",
        description: "This is an example product",
        price: 9.99,
        discount: 0,
        quantity: 1,
        thumbnailImage: "https://example.com/product-thumbnail.jpg"
    }]);
    const [test, setTest] = useState<string>("test");

    function populateProductList (fetchedProducts: ProductType[]) {
        // TODO: fetch product list from API
        setProductList(fetchedProducts);
    }

    function addToCart (product: CartProductType) {
        // TODO: add product to cart
        setCart([...cart, product]);
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