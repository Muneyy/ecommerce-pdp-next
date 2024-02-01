import hamburgerMenu from "@/assets/images/icon-menu.svg";
import logoSvg from "@/assets/images/logo.svg";
import cartSvg from "@/assets/images/icon-cart.svg";
import avatarPng from "@/assets/images/image-avatar.png";
import styles from "./Header.module.sass";
import Image from "next/image";

export default function Header() {
  
  return (
    <header className={styles.header}>
      <section className={styles.headerLeftSide}>
        <button className={styles.menuButton}>
          <Image  src={hamburgerMenu} alt="hamburger menu" />
        </button>
      </section>
      <section className={styles.headerRightSide}>
        <div className="logo">
          <Image className={styles.companyLogo} src={logoSvg} alt="sneakers company logo" />
        </div>
        <div className={styles.userAndAvatar}>
          <button className={styles.cartButton}>
            <Image src={cartSvg} alt="shopping cart icon" />
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
