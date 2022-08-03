import styles from "./footer.module.css";
import Link from "next/link";
import useLevel from "../../hooks/level";

export default function Footer() {
  const { level1, level2, level3, ebook } = useLevel();

  return (
    <footer className={styles.footer}>
      <div className={styles.navigators}>
        <h2>Navigation</h2>
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
        <h2>Blogs</h2>
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
      {level1 || level2 || level3 || ebook ? (
        <div className={styles.try}>
          <Link href="/portal">
            <button type="button" className="try-btn">
              go to portal
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.try}>
          <Link href="/">
            <button type="button" className="try-btn">
              try for free
            </button>
          </Link>
        </div>
      )}
      <div className={styles.copyrights}>
        <p>Copyrights Reserved 2022 Ⓒ </p>
      </div>
    </footer>
  );
}
