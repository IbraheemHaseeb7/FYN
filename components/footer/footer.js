import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.navigators}>
        <Link href="/">
          <p>Home</p>
        </Link>
        <Link href="/about-us">
          <p>About Us</p>
        </Link>
        <Link href="/contact-us">
          <p>Contact Us</p>
        </Link>
        <Link href="/blogs">
          <p>Blogs</p>
        </Link>
      </div>
      <div className={styles.blogs}>
        <Link href="/blogs/123">
          <p>Introduction Video</p>
        </Link>
        <Link href="/blogs/123">
          <p>What is pornography?</p>
        </Link>
        <Link href="/blogs/123">
          <p>Our Rehab process</p>
        </Link>
        <Link href="/blogs/123">
          <p>Who are we?</p>
        </Link>
        <Link href="/blogs/123">
          <p>What do we do?</p>
        </Link>
      </div>
      <div className={styles.try}>
        <Link href="/">
          <button type="button" className="try-btn">
            try for free
          </button>
        </Link>
      </div>
      <div className={styles.copyrights}>
        <p>Copyrights Reserved 2022 Ⓒ </p>
      </div>
    </footer>
  );
}
