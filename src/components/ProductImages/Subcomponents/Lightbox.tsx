import React, { useCallback, useEffect } from "react";
import { ImageLinkType } from "@/types/productTypes";
import styles from './Lightbox.module.sass';
import ImageCarousel from "./ImageCarousel";
import { CloseSvg } from "@/assets/svgs/SvgComponents";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import ThumbnailImages from "./ThumbnailImages";

export default function Lightbox({
  isDesktop, currentIndex, imageLinks, thumbnailImageLinks, setShowLightbox, setCurrentIndex,
}: {
  isDesktop: boolean;
  currentIndex: number;
  imageLinks: ImageLinkType[];
  thumbnailImageLinks: ImageLinkType[];
  setShowLightbox: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleCloseClick = () => {
    setShowLightbox(false);
  };

  const lightboxRef = React.useRef(null);

  const handleKeyboardNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < imageLinks.length - 1 ? prev + 1 : prev));
      } else if (e.key === "Escape") {
        setShowLightbox(false);
      }
    },
    [setCurrentIndex, setShowLightbox, imageLinks.length],
  );

  useEffect(() => {
    if (lightboxRef.current) {
      (lightboxRef.current as HTMLElement).focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (lightboxRef.current
            && !(lightboxRef.current as HTMLElement).contains(event.target as Node)
            // enable the use of scrollbar in lightbox
            && (event.target as HTMLElement).classList.contains("scrollbar-class-name")) {
        setShowLightbox(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyboardNavigation(event);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxRef, setShowLightbox, setCurrentIndex, imageLinks.length, handleKeyboardNavigation]);

  return (
    <section ref={lightboxRef} className={styles.lightboxContent}>
      <button
        type="button"
        aria-label="Close lightbox display"
        onClick={handleCloseClick}
        className={styles.closeButton}
      >
        <CloseSvg />
      </button>
      <div className={styles.navButtons}>
        <PrevButton setCurrentIndex={setCurrentIndex} />
        <NextButton setCurrentIndex={setCurrentIndex} />
      </div>
      <ImageCarousel
        isLightbox
        isDesktop={isDesktop}
        currentIndex={currentIndex}
        imageLinks={imageLinks}
      />
      <ThumbnailImages
        thumbnailImageLinks={thumbnailImageLinks}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
}
