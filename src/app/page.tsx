'use client';

import Image from "next/image";
import styles from "./page.module.css";
import CartProvider from "@/context/CartContext";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className={styles.main}>
        <CartProvider>
          <Header />
        </CartProvider>
    </main>
  );
}
