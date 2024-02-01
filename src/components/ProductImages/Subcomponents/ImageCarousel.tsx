import Image from "next/image";
import { ImageLinkType } from '@/types/productTypes';
import styles from './ImageCarousel.module.sass';

export default function ImageCarousel({
  isLightbox, currentIndex, imageLinks, isDesktop,
}: {
  isLightbox: boolean,
  currentIndex: number,
  imageLinks: ImageLinkType[],
  isDesktop: boolean
}) {
  return (
    <div className={isLightbox ? styles.lightboxImagesContainer : styles.imagesContainer}>
      <div
        className={styles.carousel}
        style={{
          transform: isDesktop
            ? `translateX(-${currentIndex * 100}%)`
            : `translateX(-${(currentIndex * 100) / 4}%)`,
          transition: "transform 0.15s ease-in-out",
        }}
      >
        {imageLinks.map((image) => (
          <Image
            className={styles.productImage}
            key={image.altText}
            src={image.link}
            alt={image.altText}
            placeholder="blur"
          />
        ))}
      </div>
    </div>
  );
}
