import React from "react";
import { PrevImageSvg } from "@/assets/svgs/SvgComponents";
import styles from './PrevButton.module.sass';

export default function PrevButton({ setCurrentIndex } : {
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handlePrevClick = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  function handleKeyboardNavigation(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowLeft") {
      handlePrevClick();
    }
  }

  return (
    <button
      type="button"
      aria-label="Go to previous image"
      onKeyDown={handleKeyboardNavigation}
      onClick={handlePrevClick}
      className={styles.prevButton}
    >
      <PrevImageSvg />
    </button>
  );
}
