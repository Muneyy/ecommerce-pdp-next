"use client";

import avatarPng from "@/assets/images/image-avatar.png";
import styles from "./Header.module.sass";
import Image from "next/image";
import { CartSvg, LogoSvg, MenuSvg } from "@/assets/svgs/SvgComponents";

export default function Header({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <header className={styles.header}>
      <section
        aria-label="Contains hamburger menu icon to toggle sidebar"
        className={styles.headerLeftSide}
      >
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
        <div aria-label="Contains company logo" className="logo">
          <LogoSvg />
        </div>
        <div
          aria-label="Contains shopping cart and user icons"
          className={styles.userAndAvatar}
        >
          <button
            type="button"
            className={styles.cartButton}
            aria-label="Toggle shopping cart"
          >
            <CartSvg />
          </button>
          <Image
            className={styles.avatar}
            src={avatarPng}
            alt="icon for user avatar, a long-haired man with sunglasses"
            width={29}
          />
        </div>
      </section>
    </header>
  );
}
