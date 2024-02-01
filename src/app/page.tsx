// "use client";

import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import CartProvider from "@/context/CartContext";
import { makeServer } from "@/mirage/mirage";

makeServer();

export default function Home() {
  return (
    <main className={styles.main}>
      <CartProvider>
        <Header />
      </CartProvider>
    </main>
  );
}
