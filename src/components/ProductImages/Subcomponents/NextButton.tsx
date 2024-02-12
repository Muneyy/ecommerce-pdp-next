import React from "react";
import { NextImageSvg } from "@/assets/svgs/SvgComponents";
import styles from './NextButton.module.sass';

export default function NextButton({ setCurrentIndex } : {
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleNextClick = () => {
    setCurrentIndex((prev) => (prev < 3 ? prev + 1 : prev));
  };

  function handleKeyboardNavigation(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight") {
      handleNextClick();
    }
  }

  return (
    <button
      type="button"
      aria-label="Go to next image"
      onKeyDown={handleKeyboardNavigation}
      onClick={handleNextClick}
      className={styles.nextButton}
    >
      <NextImageSvg />
    </button>
  );
}
