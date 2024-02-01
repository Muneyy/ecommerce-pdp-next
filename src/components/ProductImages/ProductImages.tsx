import React, { useEffect, useState } from "react";
import { ImageLinkType } from "@/types/productTypes";
import styles from "./ProductImages.module.sass";
import useMediaQuery from "@/hooks/useMediaQuery";
import ImageCarousel from "./Subcomponents/ImageCarousel";
import Lightbox from "./Subcomponents/Lightbox";
import NextButton from "./Subcomponents/NextButton";
import PrevButton from "./Subcomponents/PrevButton";
import ThumbnailImages from "./Subcomponents/ThumbnailImages";

export default function ProductImages({ isLightbox, setShowLightbox } : {
  isLightbox: boolean;
  setShowLightbox: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [imageLinks, setImageLinks] = useState<ImageLinkType[]>([]);
  const [thumbnailImageLinks, setThumbnailImageLinks] = useState<ImageLinkType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setImageLinks(data[0].imageLinks);
        setThumbnailImageLinks(data[0].thumbnailImageLinks);
      } catch (error) {
        console.error(error);
      }
    }

    fetchImages();
  }, []);

  // Return lightbox component
  if (isLightbox) {
    return (
      <Lightbox
        setShowLightbox={setShowLightbox}
        setCurrentIndex={setCurrentIndex}
        isDesktop={isDesktop}
        currentIndex={currentIndex}
        imageLinks={imageLinks}
        thumbnailImageLinks={thumbnailImageLinks}
      />
    );
  }

  if (isDesktop) {
    return (
      <section className={styles.desktopProductImages}>
        <button
          type="button"
          aria-label="Show lightbox display"
          onClick={() => setShowLightbox(true)}
          className={styles.desktopLightboxButton}
        >
          <ImageCarousel
            isLightbox={false}
            isDesktop
            currentIndex={currentIndex}
            imageLinks={imageLinks}
          />
        </button>
        <ThumbnailImages
          thumbnailImageLinks={thumbnailImageLinks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </section>
    );
  }

  // return mobile view as default
  return (
    <section className={styles.sliderContainer}>
      <PrevButton setCurrentIndex={setCurrentIndex} />
      <NextButton setCurrentIndex={setCurrentIndex} />
      <ImageCarousel
        isLightbox={false}
        isDesktop={isDesktop}
        currentIndex={currentIndex}
        imageLinks={imageLinks}
      />
    </section>
  );
}
