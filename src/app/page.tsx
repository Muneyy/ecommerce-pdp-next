"use client";

import React, {
  useCallback, useState, useMemo, useEffect,
} from "react";
import Header from "@/components/Header/Header";
import styles from "./page.module.sass";
import CartProvider from "@/context/CartContext";
import makeServer from "@/mirage/mirage";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProductImages from "@/components/ProductImages/ProductImages";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import useMediaQuery from "@/hooks/useMediaQuery";

makeServer();

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  // memoize <Header /> component so that
  // it does not re-render when sidebar
  // is toggled
  const toggleSidebar = useCallback(() => {
    setShowSidebar((prevState) => !prevState);
  }, []);

  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [showLightbox, setShowLightbox] = useState(false);

  const renderSideBar = () => {
    if (!isDesktop) {
      return (
        <>
          {showSidebar && (
            <button
              type="button"
              aria-label="Close sidebar"
              className={styles.overlay}
              onClick={toggleSidebar}
            />
          )}
          <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    if (isDesktop) {
      setShowSidebar(false);
    }
    if (isMobile) {
      setShowLightbox(false);
    }
  }, [isDesktop, isMobile]);

  const renderLightbox = () => {
    if (showLightbox) {
      return (
        <div className={styles.lightboxOverlay}>
          <ProductImages isLightbox={showLightbox} setShowLightbox={setShowLightbox} />
        </div>
      );
    }
    return null;
  };

  const memoizedHeader = useMemo(() => {
    return <Header toggleSidebar={toggleSidebar} />;
  }, [toggleSidebar]);

  return (
    <main>
      {renderLightbox()}
      <div className={styles.main}>
        {renderSideBar()}
        <CartProvider>
          {memoizedHeader}
          <div className={styles.divider}>
            <ProductImages isLightbox={false} setShowLightbox={setShowLightbox} />
            <ProductDetails />
          </div>
        </CartProvider>
      </div>
    </main>
  );
}
