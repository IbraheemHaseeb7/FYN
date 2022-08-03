import Link from "next/link";
import styles from "./navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Levels from "../../protectors/levels";
import useLevel from "../../hooks/level";

export default function Navbar() {
  const [openClose, setOpenClose] = useState(false);
  const { level1, level2, level3, ebook } = useLevel();

  function open_or_close() {
    setOpenClose(!openClose);
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <div className={styles.logo_container}>
          <img className={styles.logo} src="logo.png" alt="logo" />
        </div>
      </Link>
      <div className={styles.options_container}>
        <Link href="/">
          <h3>Home</h3>
        </Link>
        <Link href="/blogs">
          <h3>Blogs</h3>
        </Link>
        <Link href="/videos">
          <h3>Videos</h3>
        </Link>
        <Link href="/forums">
          <h3>Forums</h3>
        </Link>
        <Link href="/sign-in">
          <h3>Sign In</h3>
        </Link>
        <Link href="/packages">
          <h3>Packages</h3>
        </Link>
      </div>
      {level1 || level2 || level3 || ebook ? (
        <div className={styles.sign_up_container}>
          <Link href="/portal">
            <button type="button" className="try-btn">
              go to portal
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.sign_up_container}>
          <Link href="/">
            <button type="button" className="try-btn">
              try for free
            </button>
          </Link>
        </div>
      )}
      <div className={styles.burger_container}>
        <button type="button" onClick={open_or_close}>
          <MenuIcon />
        </button>
      </div>
      <div
        className={styles.shadow}
        onClick={open_or_close}
        style={openClose ? { display: "block" } : { display: "none" }}
      ></div>
      <div
        className={styles.sidebar_container}
        style={openClose ? { right: 0 } : { right: "-100%" }}
      >
        <div className={styles.close_container} onClick={open_or_close}>
          <CloseIcon />
        </div>
        <div className={styles.sidebar_options}>
          <Link href="/">
            <p onClick={open_or_close}>Home</p>
          </Link>
          <Link href="/blogs">
            <p onClick={open_or_close}>Blogs</p>
          </Link>
          <Link href="/videos">
            <p onClick={open_or_close}>Videos</p>
          </Link>
          <Link href="/forums">
            <p onClick={open_or_close}>Forums</p>
          </Link>
          <Link href="/sign-in">
            <p onClick={open_or_close}>Sign In</p>
          </Link>
          <Link href="/packages">
            <p onClick={open_or_close}>Packages</p>
          </Link>
          <Levels>
            <Link href="/portal">
              <p onClick={open_or_close}>Portal</p>
            </Link>
          </Levels>
        </div>
      </div>
    </nav>
  );
}
