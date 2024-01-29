import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export default function Header () {
    const { cart } = useContext(CartContext);
    return (
        <header>
            {cart.map((product) => {
                return (
                    <div key={product.id}>
                        <p>{product.title}</p>
                    </div>
                )
            })}
        </header>
    );
}