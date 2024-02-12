import styles from './Navbar.module.sass';

export default function Navbar() {
  const navLinks = ["Collections", "Men", "Women", "About", "Contact"];

  return (
    <nav className={styles.navLinks}>
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
  );
}
