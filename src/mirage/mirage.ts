import { createServer, Model } from "miragejs"
import imageProduct1 from '@/assets/images/image-product-1.jpg'
import imageProduct2 from '@/assets/images/image-product-2.jpg'
import imageProduct3 from '@/assets/images/image-product-3.jpg'
import imageProduct4 from '@/assets/images/image-product-4.jpg'
import imageProduct1Thumbnail from '@/assets/images/image-product-1-thumbnail.jpg'
import imageProduct2Thumbnail from '@/assets/images/image-product-2-thumbnail.jpg'
import imageProduct3Thumbnail from '@/assets/images/image-product-3-thumbnail.jpg'
import imageProduct4Thumbnail from '@/assets/images/image-product-4-thumbnail.jpg'

export function makeServer() {
  let server = createServer({
    models: {
      product: Model,
    },

    routes() {
      this.namespace = "api"

      this.get("/products", (schema) => {
        return [
        { 
            id: 1,
            company: 'Sneaker Company',
            title: 'Fall Limited Edition Sneakers',
            description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
            price: 250,
            discount: 0.5,
            imageLinks: [
                imageProduct1,
                imageProduct2,
                imageProduct3,
                imageProduct4,
                imageProduct1Thumbnail,
                imageProduct2Thumbnail,
                imageProduct3Thumbnail,
                imageProduct4Thumbnail,
            ],
            thumbnailImage: imageProduct1Thumbnail,
        },
    ]
      })
    },
  })

  return server
}
