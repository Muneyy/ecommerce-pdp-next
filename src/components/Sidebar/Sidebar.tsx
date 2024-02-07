"use client";

import { CloseSvg } from "@/assets/svgs/SvgComponents";
import styles from "./Sidebar.module.sass";

export default function Sidebar({
  showSidebar,
  toggleSidebar,
}: {
  showSidebar: boolean;
  toggleSidebar: () => void;
}) {
  const navLinks = ["Collections", "Men", "Women", "About", "Contact"];

  return (
    <aside
      className={`${styles.sidebar} ${showSidebar ? styles.active : null}`}
    >
      <nav>
        <button
          type="button"
          aria-label="Close sidebar menu"
          onClick={toggleSidebar}
          className={styles.closeButton}
        >
          <CloseSvg />
        </button>
        <ul>
          {navLinks.map((link) => {
            return (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
