"use client";

import Header from "@/components/Header/Header";
import styles from "./page.module.sass";
import CartProvider from "@/context/CartContext";
import { makeServer } from "@/mirage/mirage";
import { useCallback, useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

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
      <CartProvider>
        {showSidebar && (
          <>
            <Sidebar toggleSidebar={toggleSidebar} />
            <div className={styles.overlay} onClick={toggleSidebar}></div>
          </>
        )}
        {memoizedHeader}
      </CartProvider>
    </main>
  );
}
