import React, { useContext, useEffect, useRef } from "react";
import styles from "./Cart.module.sass";
import { CartContext } from "@/context/CartContext";
import CartItem from "./CartItem";

export default function Cart({ buttonRef, setIsCartShown } : {
  buttonRef: React.RefObject<HTMLButtonElement>;
  setIsCartShown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { cart } = useContext(CartContext);

  const cartRef = useRef(null);

  // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideClicked = cartRef.current
        && !(cartRef.current as HTMLElement).contains(event.target as Node);
      const isButtonClicked = buttonRef.current
        && (buttonRef.current as HTMLButtonElement).contains(event.target as Node);
      // if button is clicked (which is also outside of cart), do nothing
      if (isOutsideClicked && isButtonClicked) {
        return;
      }
      // if outside of cart is clicked, close cart
      if (isOutsideClicked) {
        setIsCartShown(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [cartRef, buttonRef, setIsCartShown]);

  return (
    <aside ref={cartRef} className={styles.cartCard}>
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
