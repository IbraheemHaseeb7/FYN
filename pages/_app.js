import { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [scrollValue, setScrollValue] = useState();

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const win = document.body.scrollTop || document.documentElement.scrollTop;

      setScrollValue(win);
    });
  }, []);

  return (
    <>
      <Navbar scrollValue={scrollValue} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
