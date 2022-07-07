import styles from "../styles/Home.module.css";
import Link from "next/link";
import Footer from "../components/footer/footer";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Home() {
  const image = useRef();
  const act = useRef();
  const left = useRef();
  const right = useRef();
  const methods = useRef();
  const circle = useRef();
  const circle2 = useRef();
  const line = useRef();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    var tl = gsap.timeline();

    // initial sets
    gsap.set(image.current, {
      x: 0,
    });
    gsap.set(left.current, {
      x: "-100%",
      y: "-20%",
      scale: 2,
    });
    gsap.set(right.current, {
      x: "120%",
      y: "-60%",
      scale: 2,
    });
    gsap.set(methods.current, {
      opacity: 0,
    });
    gsap.set(circle.current, {
      y: "-650%",
      x: "1150%",
      scale: 1.5,
      strokeDashoffset: 295,
      strokeDasharray: 295,
    });
    gsap.set(circle2.current, {
      scale: 3,
      y: "-100%",
      strokeDasharray: 295,
      strokeDashoffset: 295,
    });
    gsap.set(line.current, {
      y: "-500%",
      x: "10%",
      scale: 3,
      strokeDashoffset: 771,
      strokeDasharray: 771,
    });

    // animation timeline
    tl.to(image.current, {
      x: "-100%",
      scrollTrigger: {
        markers: false,
        start: "center bottom",
        end: "+=50%",
        scrub: 1,
      },
    });
    tl.to(act.current, {
      opacity: 0,
      scrollTrigger: {
        markers: false,
        scrub: 1,
        start: "center bottom",
        end: "+=50%",
      },
    });
    tl.to(left.current, {
      x: "-40%",
      scrollTrigger: {
        markers: false,
        start: "50% bottom",
        end: "+=50%",
        scrub: 1,
      },
    });
    tl.to(right.current, {
      x: "30%",
      scrollTrigger: {
        markers: false,
        start: "50% bottom",
        end: "+=50%",
        scrub: 1,
      },
    });
    tl.to(circle.current, {
      strokeDashoffset: 0,
      scrollTrigger: {
        markers: false,
        start: "50% bottom",
        end: "+=50%",
        scrub: 1,
      },
    });
    tl.to(circle2.current, {
      strokeDashoffset: 0,
      scrollTrigger: {
        markers: false,
        start: "50% bottom",
        end: "+=50%",
        scrub: 1,
      },
    });
    tl.to(line.current, {
      strokeDashoffset: 0,
      scrollTrigger: {
        markers: false,
        start: "50% bottom",
        end: "+=50%",
        scrub: 1,
      },
    });
    tl.to(methods.current, {
      opacity: 1,
      scrollTrigger: {
        markers: false,
        start: "50% bottom",
        end: "+=50%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div className={styles.home_container}>
      <section className={styles.first_page}>
        <div className={styles.image_container} ref={image}>
          <img src="homepage.png" alt="image" className={styles.img} />
        </div>
        <div className={styles.main_title} ref={act}>
          <h1>The Act of Shame</h1>
        </div>
      </section>
      <section className={styles.methods_container}>
        <div
          ref={left}
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            width="170"
            height="305"
            viewBox="0 0 170 305"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M95.5 157C155.5 131.4 178.5 80.5 166 46C153.5 11.5 118.5 3.99999 64 0.499995C20.4 -2.30001 -35.8333 29.6667 -58.5 46V198C-53.5 232.833 -39.4 302.8 -23 304C-2.5 305.5 16.5 267 20.5 235C24.5 203 20.5 189 95.5 157Z"
              fill="#FF8E7E"
            />
          </svg>
        </div>
        <div className={styles.right} ref={right}>
          <svg
            width="329"
            height="176"
            viewBox="0 0 329 176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M309.5 1.50001C352.3 3.50001 386 36.3333 397.5 52.5L423 101L355.5 175H133.5C113 175 59.5 176 43 175C26.5 174 12.4999 164.5 6.99995 157C1.49995 149.5 -10.5001 124 22.4999 90.5C55.4999 57 69.4999 76.5 104 79C138.5 81.5 154 66.5 188.5 34.5C223 2.50001 256 -0.999992 309.5 1.50001Z"
              fill="#FF8E7E"
            />
          </svg>
        </div>
        <svg
          width="103"
          height="103"
          viewBox="0 0 103 103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={circle}
        >
          <g>
            <path
              d="M98.5 47.5C98.5 73.4574 77.4574 94.5 51.5 94.5C25.5426 94.5 4.5 73.4574 4.5 47.5C4.5 21.5426 25.5426 0.5 51.5 0.5C77.4574 0.5 98.5 21.5426 98.5 47.5Z"
              stroke="#FF8E7E"
              shape-rendering="crispEdges"
              id="circle"
              strokeWidth="2"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_39_3"
              x="0"
              y="0"
              width="103"
              height="103"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_39_3"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_39_3"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <svg
          width="103"
          height="103"
          viewBox="0 0 103 103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={circle2}
        >
          <g>
            <path
              d="M98.5 47.5C98.5 73.4574 77.4574 94.5 51.5 94.5C25.5426 94.5 4.5 73.4574 4.5 47.5C4.5 21.5426 25.5426 0.5 51.5 0.5C77.4574 0.5 98.5 21.5426 98.5 47.5Z"
              stroke="#FF8E7E"
              shape-rendering="crispEdges"
              id="circle"
              strokeWidth="2"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_39_3"
              x="0"
              y="0"
              width="103"
              height="103"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_39_3"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_39_3"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <svg
          width="619"
          height="139"
          viewBox="0 0 619 139"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.line}
          ref={line}
        >
          <path
            id="line"
            d="M669.5 118C634.667 130.833 572.5 150 509 127C449.489 105.445 454.654 63.0786 389 45C320 26 234.5 94.5 176 79.5C88.862 57.1569 35 0.5 -49.5 0.5"
            stroke="#FF8E7E"
            strokeWidth="1"
          />
        </svg>

        <div className={styles.methods} ref={methods}>
          Our Methods of Practice
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
}
