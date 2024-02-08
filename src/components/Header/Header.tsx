"use client";

import Image from "next/image";
import { useContext, useRef, useState } from "react";
import avatarPng from "@/assets/images/image-avatar.png";
import styles from "./Header.module.sass";
import { CartSvg, LogoSvg, MenuSvg } from "@/assets/svgs/SvgComponents";
import Cart from "./SubComponents/Cart";
import { CartContext } from "@/context/CartContext";

export default function Header({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [isCartShown, setIsCartShown] = useState<boolean>(false);
  const { cart } = useContext(CartContext);

  const handleCartClick = () => {
    setIsCartShown((prevState) => !prevState);
  };

  const buttonRef = useRef(null);

  return (
    <header className={styles.header}>
      <section className={styles.headerLeftSide}>
        <button
          aria-label="Toggle sidebar menu"
          type="button"
          onClick={toggleSidebar}
          className={styles.menuButton}
        >
          <MenuSvg />
        </button>
      </section>
      <section className={styles.headerRightSide}>
        <a aria-label="Link to homepage" className="logo" href="#">
          <LogoSvg />
        </a>
        <div className={styles.userAndAvatar}>
          <button
            type="button"
            className={styles.cartButton}
            aria-label="Toggle shopping cart"
            onClick={handleCartClick}
            ref={buttonRef}
          >
            <CartSvg />
            {cart.length > 0 && (
              <span className={styles.cartQuantityDisplay}>
                {cart[0].quantity}
              </span>
            )}
          </button>
          <Image
            className={styles.avatar}
            src={avatarPng}
            alt="icon for user avatar, a long-haired man with sunglasses"
            width={29}
          />
          {isCartShown && (
            <Cart
              buttonRef={buttonRef}
              setIsCartShown={setIsCartShown}
            />
          )}
        </div>
      </section>
    </header>
  );
}
