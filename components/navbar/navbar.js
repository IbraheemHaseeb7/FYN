import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <div className={styles.logo_container}>
          <img className={styles.logo} src="logo.png" alt="logo" />
        </div>
      </Link>
      <div className={styles.options_container}>
        <Link href="/first-step">
          <h3>First Step</h3>
        </Link>
        <Link href="/blogs">
          <h3>Blogs</h3>
        </Link>
        <Link href="/about-us">
          <h3>About Us</h3>
        </Link>
        <Link href="/forums">
          <h3>Forums</h3>
        </Link>
        <Link href="/sign-in">
          <h3>Sign In</h3>
        </Link>
      </div>
      <div className={styles.sign_up_container}>
        <Link href="/">
          <button type="button" className="try-btn">
            try for free
          </button>
        </Link>
      </div>
    </nav>
  );
}
