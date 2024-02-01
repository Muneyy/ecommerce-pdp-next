import { ImageLinkType } from "@/types/product"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from './ProductImages.module.sass'

export default function ProductImages () {
  const [imageLinks, setImageLinks] = useState<ImageLinkType[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setImageLinks(data[0].imageLinks))
  }, [])

  return (
    <section className={styles.sliderContainer}>
      {imageLinks.map((image) => {
        return (
          <div key={image.link}>
            <Image
              className={styles.productImage}
              src={image.link}
              alt={image.altText}
              placeholder="blur"
              style={{objectFit: "cover"}}
            />
          </div>

        )
      })}
    </section>
  )
}