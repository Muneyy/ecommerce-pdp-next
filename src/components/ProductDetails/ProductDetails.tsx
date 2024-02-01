import { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.sass";
import { ProductType } from "@/types/productTypes";
import { CartContext } from "@/context/CartContext";
import { AddToCartSvg, MinusSvg, PlusSvg } from "@/assets/svgs/SvgComponents";

export default function ProductDetails() {
  const [fetchedDetails, setFetchedDetails] = useState<ProductType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("api/products");
        const data = await response.json();
        setFetchedDetails(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : prevQuantity));
  };

  const handleAddToCart = () => {
    if (fetchedDetails && quantity > 0) {
      addToCart({
        ...fetchedDetails,
        quantity,
      });
    }
  };

  function showTwoDecimals(num: number) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  if (isLoading) {
    return <span className={styles.loader} />;
  }

  if (fetchedDetails) {
    const {
      company, title, description, price, discount,
    } = fetchedDetails;

    return (
      <article className={styles.detailsContainer}>
        <section className={styles.detailsText}>
          <span className={styles.company}>{company}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <section className={styles.priceInfo}>
            <div className={styles.priceAndDiscount}>
              <span className={styles.discountedPrice}>
                $
                {showTwoDecimals(price * (1 - discount))}
              </span>
              <span className={styles.discount}>
                {discount * 100}
                %
              </span>
              {/* DELETE THIS - TEMP CODE FOR DEBUGGING */}
              {cart.length > 0 ? (
                <span className={styles.discount}>{cart[0].quantity}</span>
              ) : null}
              {/* DELETE THIS - TEMP CODE FOR DEBUGGING */}
            </div>
            <span className={styles.originalPrice}>
              $
              {showTwoDecimals(price)}
            </span>
          </section>
        </section>
        <section className={styles.utilities}>
          <div className={styles.quantityControl}>
            <button
              type="button"
              aria-label="Decrease quantity of product to be added to cart"
              onClick={handleDecrement}
            >
              <MinusSvg />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity of product to be added to cart"
              onClick={handleIncrement}
            >
              <PlusSvg />
            </button>
          </div>
          <button
            type="button"
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            aria-label="Add specified quantity of product to cart"
          >
            <AddToCartSvg />
            <span>Add to cart</span>
          </button>
        </section>
      </article>
    );
  }
}
