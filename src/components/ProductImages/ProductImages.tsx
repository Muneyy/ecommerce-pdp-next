import { ImageLinkType } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ProductImages.module.sass";

export default function ProductImages() {
  const [imageLinks, setImageLinks] = useState<ImageLinkType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setImageLinks(data[0].imageLinks));
  }, []);

  const handleNextClick = () => {
    setCurrentIndex((prev) => prev < 3 ? prev + 1 : prev);
  }

  const handlePrevClick = () => {
    setCurrentIndex((prev) => prev > 0 ? prev - 1 : prev);
  }

  return (
    <section className={styles.sliderContainer}>
      <button onClick={handlePrevClick} className={styles.prevButton}>
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <button onClick={handleNextClick} className={styles.nextButton}>
        <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <div className={styles.carousel}>
        {imageLinks.map((image) => {
          return (
            <div 
              className={styles.productImageContainer} 
              key={image.link}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 0.2s ease-in-out"
              }}
            >
              <Image
                className={styles.productImage}
                src={image.link}
                alt={image.altText}
                placeholder="blur"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
