import { ImageLinkType } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ProductImages.module.sass";

export default function ProductImages() {
  const [imageLinks, setImageLinks] = useState<ImageLinkType[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setImageLinks(data[0].imageLinks));
  }, []);

  return (
    <section className={styles.sliderContainer}>
      <button className={styles.prevButton}>
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <button className={styles.nextButton}>
        <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      {imageLinks.map((image) => {
        return (
          <div key={image.link}>
            <Image
              className={styles.productImage}
              src={image.link}
              alt={image.altText}
              placeholder="blur"
            />
          </div>
        );
      })}
    </section>
  );
}
