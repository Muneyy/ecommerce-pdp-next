"use client";

import React, { useCallback, useState, useMemo } from "react";
import Header from "@/components/Header/Header";
import styles from "./page.module.sass";
import CartProvider from "@/context/CartContext";
import makeServer from "@/mirage/mirage";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProductImages from "@/components/ProductImages/ProductImages";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

makeServer();

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  // memoize <Header /> component so that
  // it does not re-render when sidebar
  // is toggled
  const toggleSidebar = useCallback(() => {
    setShowSidebar((prevState) => !prevState);
  }, []);

  const memoizedHeader = useMemo(() => {
    return <Header toggleSidebar={toggleSidebar} />;
  }, [toggleSidebar]);

  return (
    <main className={styles.main}>
      {showSidebar && (
        <button
          type="button"
          aria-label="Close sidebar"
          className={styles.overlay}
          onClick={toggleSidebar}
        />
      )}
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <CartProvider>
        {memoizedHeader}
        <ProductImages />
        <ProductDetails />
      </CartProvider>
    </main>
  );
}
