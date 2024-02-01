import { useContext } from "react";
import styles from "./Cart.module.sass";
import { CartContext } from "@/context/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <aside className={styles.cartCard}>
      <header>
        <span>Cart</span>
      </header>
      <main>
        {cart.length > 0 ? (
          <div className={styles.cartBody}>
            {cart.map((cartItem) => {
              return <CartItem key={cartItem.id} cartItem={cartItem} />;
            })}
            <button
              type="button"
              aria-label="Checkout products in cart"
            >
              Checkout
            </button>
          </div>
        ) : (
          <span>Your cart is empty.</span>
        )}
      </main>
    </aside>
  );
}
