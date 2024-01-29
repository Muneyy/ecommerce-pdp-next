import { CartProductType, ProductType } from "@/types/product";
import { createContext, useState, ReactNode } from "react";

type CartContextType = {
    productList: ProductType[];
    cart: CartProductType[];
    populateProductList: (fetchedProducts: ProductType[]) => void;
    addToCart: (product: CartProductType) => void;
    deleteFromCart: (id: number) => void;
  };
  
  const CartContext = createContext<CartContextType>({
    productList: [],
    cart: [],
    populateProductList: (fetchedProducts: ProductType[]) => {},
    addToCart: (product: CartProductType) => {},
    deleteFromCart: (id: number) => {},
  });

export default function CartProvider({ children } : {
    children: ReactNode
}) {
    const [productList, setProductList] = useState<ProductType[]>([]);
    const [cart, setCart] = useState<CartProductType[]>([]);

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
    <CartContext.Provider value={{productList, cart, populateProductList, addToCart, deleteFromCart}}>
        {children}
    </CartContext.Provider>
    );
}