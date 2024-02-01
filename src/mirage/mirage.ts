import { createServer, Model } from "miragejs";
import imageProduct1 from "@/assets/images/image-product-1.jpg";
import imageProduct2 from "@/assets/images/image-product-2.jpg";
import imageProduct3 from "@/assets/images/image-product-3.jpg";
import imageProduct4 from "@/assets/images/image-product-4.jpg";
import imageProduct1Thumbnail from "@/assets/images/image-product-1-thumbnail.jpg";
import imageProduct2Thumbnail from "@/assets/images/image-product-2-thumbnail.jpg";
import imageProduct3Thumbnail from "@/assets/images/image-product-3-thumbnail.jpg";
import imageProduct4Thumbnail from "@/assets/images/image-product-4-thumbnail.jpg";

export function makeServer() {
  let server = createServer({
    models: {
      product: Model,
    },

    routes() {
      this.namespace = "api";

      this.get("/products", (schema) => {
        return [
          {
            id: 1,
            company: "Sneaker Company",
            title: "Fall Limited Edition Sneakers",
            description:
              "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
            price: 250,
            discount: 0.5,
            imageLinks: [
              {
                link: imageProduct1,
                altText:
                  "A pair of white, orange, and brown sneakers on an orange background.",
              },
              {
                link: imageProduct2,
                altText:
                  "A pair of white, orange, and brown sneakers on an orange background with one shoe (side view) on top of two white pebbles and a branch in front",
              },
              {
                link: imageProduct3,
                altText:
                  "One shoe is placed on top of two white pebbles that are sandwiching the orange background that is folded like cloth",
              },
              {
                link: imageProduct4,
                altText:
                  "A seemingly floating shoe with its heel placed on top of two pebbles stacked together on an orange background",
              },
            ],
            thumbnailImageLinks: [
              {
                link: imageProduct1Thumbnail,
                altText:
                  "A pair of white, orange, and brown sneakers on an orange background.",
              },
              {
                link: imageProduct2Thumbnail,
                altText:
                  "A pair of white, orange, and brown sneakers on an orange background with one shoe showing its right side on top of two white pebbles and a branch in front",
              },
              {
                link: imageProduct3Thumbnail,
                altText:
                  "One shoe is placed on top of two white pebbles that are sandwiching the orange background that is folded like cloth",
              },
              {
                link: imageProduct4Thumbnail,
                altText:
                  "A seemingly floating shoe with its heel placed on top of two pebbles stacked together on an orange background",
              },
            ],
          },
        ];
      });
    },
  });

  return server;
}
