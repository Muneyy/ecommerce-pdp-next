import Image from "next/image";
import { useContext } from "react";
import styles from './CartItem.module.sass';
import { CartProductType } from "@/types/productTypes";
import { DeleteSvg } from "@/assets/svgs/SvgComponents";
import showTwoDecimals from "@/helperFunctions/showTwoDecimals";
import { CartContext } from "@/context/CartContext";

export default function CartItem({ cartItem } : {
    cartItem: CartProductType
}) {
  const { deleteFromCart } = useContext(CartContext);

  const handleDeleteClick = () => {
    deleteFromCart(cartItem.id);
  };

  return (
    <section className={styles.section}>
      <Image
        src={cartItem.thumbnailImageLinks[0].link}
        alt={cartItem.thumbnailImageLinks[0].altText}
        className={styles.thumbnailImage}
      />
      <div className={styles.itemDetails}>
        <p>{cartItem.title}</p>
        <div className={styles.itemPrice}>
          <span className={styles.priceAndQuantity}>
            $
            { showTwoDecimals(cartItem.price * cartItem.discount) }
            {' '}
            x
            {' '}
            {cartItem.quantity}
          </span>
          <span className={styles.priceTotal}>
            $
            {showTwoDecimals(cartItem.price * cartItem.discount * cartItem.quantity) }
          </span>
        </div>
      </div>
      <button
        type="button"
        aria-label="Delete product from cart"
        onClick={handleDeleteClick}
      >
        <DeleteSvg />
      </button>
    </section>
  );
}
