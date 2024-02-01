"use client";

import styles from "./Sidebar.module.sass";

export default function Sidebar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <button onClick={toggleSidebar} className={styles.closeButton}>
            <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                fill="#69707D"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <a href="#">
            <li>Collections</li>
          </a>
          <a href="#">
            <li>Men</li>
          </a>
          <a href="#">
            <li>Women</li>
          </a>
          <a href="#">
            <li>About</li>
          </a>
          <a href="#">
            <li>Contact</li>
          </a>
        </ul>
      </nav>
    </aside>
  );
}
