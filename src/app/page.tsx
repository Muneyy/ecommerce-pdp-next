// "use client";

import styles from "./page.module.css";
import CartProvider from "@/context/CartContext";
import { makeServer } from "@/mirage/mirage";

makeServer();

export default function Home() {
  return (
    <main className={styles.main}>
      <CartProvider>
        <div></div>
      </CartProvider>
    </main>
  );
}
