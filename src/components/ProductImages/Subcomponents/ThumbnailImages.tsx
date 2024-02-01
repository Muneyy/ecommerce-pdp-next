import React from 'react';
import Image from 'next/image';
import { ImageLinkType } from '@/types/productTypes';
import styles from './ThumbnailImages.module.sass';

export default function ThumbnailImages({ thumbnailImageLinks, currentIndex, setCurrentIndex }
    : {
    thumbnailImageLinks: ImageLinkType[];
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    }) {
  return (
    <div className={styles.thumbnailImagesContainer}>
      {thumbnailImageLinks.map((image, index) => (
        <Image
          key={image.altText}
          src={image.link}
          alt={image.altText}
          placeholder="blur"
          onClick={() => setCurrentIndex(index)}
          style={{
            filter: index === currentIndex ? "brightness(80$%)" : "brightness(100%)",
            border: index === currentIndex ? "2px solid hsl(26, 100%, 55%)" : "2px solid transparent",
          }}
          aria-label="Set this image as main image on click"
          className={styles.thumbnailImage}
        />
      ))}
    </div>
  );
}
