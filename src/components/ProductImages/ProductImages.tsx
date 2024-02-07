import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImageLinkType } from "@/types/productTypes";
import styles from "./ProductImages.module.sass";
import { NextImageSvg, PrevImageSvg } from "@/assets/svgs/SvgComponents";

export default function ProductImages() {
  const [imageLinks, setImageLinks] = useState<ImageLinkType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setImageLinks(data[0].imageLinks);
      } catch (error) {
        console.error(error);
      }
    }

    fetchImages();
  }, []);

  const handleNextClick = () => {
    setCurrentIndex((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  function handleKeyboardNavigation(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight") {
      handleNextClick();
    } else if (e.key === "ArrowLeft") {
      handlePrevClick();
    }
  }

  return (
    <section className={styles.sliderContainer}>
      <button
        type="button"
        aria-label="Go to previous image"
        onKeyDown={handleKeyboardNavigation}
        onClick={handlePrevClick}
        className={styles.prevButton}
      >
        <PrevImageSvg />
      </button>
      <button
        type="button"
        aria-label="Go to next image"
        onKeyDown={handleKeyboardNavigation}
        onClick={handleNextClick}
        className={styles.nextButton}
      >
        <NextImageSvg />
      </button>
      <div
        className={styles.carousel}
        style={{
          transform: `translateX(-${(currentIndex * 100) / 4}%)`,
          transition: "transform 0.2s ease-in-out",
        }}
      >
        {imageLinks.map((image) => (
          <div className={styles.productImageContainer} key={image.altText}>
            <Image
              className={styles.productImage}
              src={image.link}
              alt={image.altText}
              placeholder="blur"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
