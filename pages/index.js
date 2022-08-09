import styles from "../styles/Home.module.css";
import Link from "next/link";
import Footer from "../components/footer/footer";
import { gsap } from "gsap";
import { Elastic } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SwipeDownAltIcon from "@mui/icons-material/SwipeDownAlt";
import ChatIcon from "@mui/icons-material/Chat";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../libraries/firebase";
import { useContext } from "react";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";
import Metatags from "../components/meta/meta";
import useLevel from "../hooks/level";
import Transition from "../components/transition/transition";

export default function Home() {
  const { uid, username, username_set, notification } = useContext(UserContext);
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [roomExists, setRoomExists] = useState(false);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);

  const image = useRef();
  const act = useRef();
  const left = useRef();
  const right = useRef();
  const methods = useRef();
  const circle = useRef();
  const circle2 = useRef();
  const line = useRef();
  const swipe_down = useRef();
  const left_sign = useRef();
  const right_sign = useRef();
  const sign_heading = useRef();
  const sign_text = useRef();

  // steps references are created here
  const stepText1 = useRef();
  const stepText2 = useRef();
  const stepText3 = useRef();
  const stepText4 = useRef();
  const stepText5 = useRef();
  const stepImg1 = useRef();
  const stepImg2 = useRef();
  const stepImg3 = useRef();
  const stepImg4 = useRef();
  const stepImg5 = useRef();

  const steps = [
    {
      src: "step1.png",
      steps_info:
        "Identifying and understanding the problem is half the battle. Realize the issues and habits that your struggle with. Go against the grain of culture that considers pornography, masturbation, and sinful acts normal and common. The decision to change has already brought you closer to your destination.",
      text_ref: stepText1,
      img_ref: stepImg1,
      id: 1,
      heading: "Identify the Problem",
    },
    {
      src: "step2.jpg",
      steps_info:
        "Change can be overwhelming, exciting but also stressful. Use the 80/20 rule (The Pareto Principle) and work on the habits that have the most damage, first. Build around the good habits and break down the bad ones by slowing, stopping, and eventually replacing them. Go at your own pace and do not be discouraged by broken streaks, withdrawals, and eventual mishaps.",
      text_ref: stepText2,
      img_ref: stepImg2,
      id: 2,
      heading: "Focus, Strategize and Priortize",
    },
    {
      src: "step3.jpg",
      steps_info:
        "Building and nurturing the positive ideas, is essential. Make an effort to learn about the positive impacts and remember why you started. Gain knowledge, follow professionals who teach methodologies, surround yourself with better, improved, and advanced information to make your journey easier and worth the effort.",
      text_ref: stepText3,
      img_ref: stepImg3,
      id: 3,
      heading: "Learn and Act",
    },
    {
      src: "step4.jpg",
      steps_info:
        "Reach out to the people who have struggled with the same problems as yours and have fixed them. Rehabilitation, self-improvement, and growth become fun with company. Do not be afraid to ask for a helping hand and share information for the mutual benefit of everyone.Remember, we are here to help.",
      text_ref: stepText4,
      img_ref: stepImg4,
      id: 4,
      heading: "Communicate and Cooperate",
    },
    {
      src: "step5.png",
      steps_info:
        "There will be challenges along the way but with a dedication mindset and a meaningful goal, it is certainly achievable. Convert these changes into lifelong habits and choose newer and tougher goals to strive for. Life is a test, not a competition. Help others, spread positivity and always keep your eyes on the primary goal. May Allah Almighty guide us all and make our journeys easier.",
      text_ref: stepText5,
      img_ref: stepImg5,
      id: 5,
      heading: "Persist and Conquer",
    },
  ];
  gsap.registerPlugin(ScrollTrigger);

  // first animation
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        markers: false,
        start: "25% bottom",
        end: "+=50%",
        scrub: true,
      },
    });

    gsap.set(image.current, {
      x: 0,
    });
    // animation timeline

    tl.to(
      image.current,
      {
        x: "-100%",
      },
      0
    );
    tl.to(
      act.current,
      {
        opacity: 0,
      },
      0
    );
    tl.to(
      swipe_down.current,
      {
        opacity: 0,
      },
      0
    );
  }, []);

  // exit animations go here
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        markers: false,
        start: "30% bottom",
        end: "+=100%",
        scrub: true,
      },
    });

    // initial sets
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

    if (window.innerWidth < 600) {
      gsap.set(line.current, {
        y: "-650%",
        x: "10%",
        scale: 3,
        strokeDashoffset: 771,
        strokeDasharray: 771,
      });
      gsap.set(circle.current, {
        y: "-700%",
        x: "300%",
        scale: 1.5,
        strokeDashoffset: 295,
        strokeDasharray: 295,
      });
    } else {
      gsap.set(line.current, {
        y: "-500%",
        x: "10%",
        scale: 3,
        strokeDashoffset: 771,
        strokeDasharray: 771,
      });
      gsap.set(circle.current, {
        y: "-650%",
        x: "1150%",
        scale: 1.5,
        strokeDashoffset: 295,
        strokeDasharray: 295,
      });
    }

    // entering

    tl.to(
      left.current,
      {
        x: "-40%",
      },
      0
    );
    tl.to(
      right.current,
      {
        x: "30%",
      },
      0
    );
    tl.to(
      circle.current,
      {
        strokeDashoffset: 0,
      },
      0
    );
    tl.to(
      circle2.current,
      {
        strokeDashoffset: 0,
      },
      0
    );
    tl.to(
      line.current,
      {
        strokeDashoffset: 0,
      },
      0
    );
    tl.to(
      methods.current,
      {
        opacity: 1,
      },
      0
    );

    // exiting
    tl.to(
      left.current,
      {
        x: "-100%",
      },
      2
    );
    tl.to(
      right.current,
      {
        x: "120%",
      },
      2
    );
    tl.to(
      circle.current,
      {
        strokeDashoffset: 295,
      },
      2
    );
    tl.to(
      circle2.current,
      {
        strokeDashoffset: 295,
      },
      2
    );
    tl.to(
      line.current,
      {
        strokeDashoffset: 771,
      },
      2
    );
    tl.to(
      methods.current,
      {
        opacity: 0,
      },
      2
    );
  }, []);

  // staggering animation for the socials
  useEffect(() => {
    gsap.set("#social", {
      scale: 0,
    });

    gsap.to("#social", {
      scale: 1,
      ease: Elastic.easeOut.config(1, 0.3),
      stagger: {
        each: 0.2,
      },
    });
  }, []);

  // animation for the steps
  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        markers: false,
        start: "50% bottom",
        end: "+=400%",
        scrub: true,
      },
    });

    // initial sets

    gsap.set(stepImg1.current, {
      opacity: 0,
    });
    gsap.set(stepImg2.current, {
      opacity: 0,
    });
    gsap.set(stepImg3.current, {
      opacity: 0,
    });
    gsap.set(stepImg4.current, {
      opacity: 0,
    });
    gsap.set(stepImg5.current, {
      opacity: 0,
    });
    gsap.set(stepText1.current, {
      opacity: 0,
    });
    gsap.set(stepText2.current, {
      opacity: 0,
    });
    gsap.set(stepText3.current, {
      opacity: 0,
    });
    gsap.set(stepText4.current, {
      opacity: 0,
    });
    gsap.set(stepText5.current, {
      opacity: 0,
    });

    // animation begins here. Entering and exiting will be done simultaneously
    tl.to(
      stepImg1.current,
      {
        opacity: 1,
      },
      0
    );
    tl.to(
      stepText1.current,
      {
        opacity: 1,
      },
      0
    );
    tl.to(
      stepImg1.current,
      {
        opacity: 0,
      },
      1
    );
    tl.to(
      stepImg2.current,
      {
        opacity: 1,
      },
      1
    );
    tl.to(
      stepText1.current,
      {
        opacity: 0,
      },
      2
    );
    tl.to(
      stepText2.current,
      {
        opacity: 1,
      },
      2
    );
    tl.to(
      stepImg2.current,
      {
        opacity: 0,
      },
      3
    );
    tl.to(
      stepImg3.current,
      {
        opacity: 1,
      },
      3
    );
    tl.to(
      stepText2.current,
      {
        opacity: 0,
      },
      4
    );
    tl.to(
      stepText3.current,
      {
        opacity: 1,
      },
      4
    );
    tl.to(
      stepImg3.current,
      {
        opacity: 0,
      },
      5
    );
    tl.to(
      stepImg4.current,
      {
        opacity: 1,
      },
      5
    );
    tl.to(
      stepText3.current,
      {
        opacity: 0,
      },
      6
    );
    tl.to(
      stepText4.current,
      {
        opacity: 1,
      },
      6
    );
    tl.to(
      stepImg4.current,
      {
        opacity: 0,
      },
      7
    );
    tl.to(
      stepImg5.current,
      {
        opacity: 1,
      },
      7
    );
    tl.to(
      stepText4.current,
      {
        opacity: 0,
      },
      8
    );
    tl.to(
      stepText5.current,
      {
        opacity: 1,
      },
      8
    );
    tl.to(
      stepImg5.current,
      {
        opacity: 0,
      },
      9
    );
    tl.to(
      stepText5.current,
      {
        opacity: 0,
      },
      9
    );
  }, []);

  // animation for the sign up
  useEffect(() => {
    // setting up the positions

    if (window.innerWidth > 800) {
      var tl = gsap.timeline({
        scrollTrigger: {
          markers: false,
          scrub: true,
          start: "88% bottom",
          end: "+=80%",
          trigger: "#home",
          pin: "#pin",
        },
      });

      gsap.set(left_sign.current, {
        scale: 2,
        x: "-150%",
        y: "-10%",
      });
      gsap.set(right_sign.current, {
        scale: 2,
        x: "500%",
        y: "80%",
      });
      gsap.set(sign_heading.current, {
        textAlign: "center",
        y: "-550%",
        opacity: 0,
      });
      gsap.set(sign_text.current, {
        x: "50%",
        y: "-350%",
        opacity: 0,
      });
      gsap.set("#btn_container", {
        y: "-700%",
        opacity: 0,
      });

      // animation timeline is here
      tl.to(
        left_sign.current,
        {
          x: "50%",
        },
        0
      );
      tl.to(
        right_sign.current,
        {
          x: "300%",
        },
        0
      );
      tl.to(
        sign_heading.current,
        {
          y: "-500%",
          opacity: 1,
        },
        0
      );
      tl.to(
        sign_text.current,
        {
          y: "-300%",
          opacity: 1,
        },
        0
      );
      tl.to(
        "#btn_container",
        {
          y: "-650%",
          opacity: 1,
        },
        0
      );
    } else if (window.innerWidth > 200 && window.innerWidth <= 800) {
      var tl = gsap.timeline({
        scrollTrigger: {
          markers: false,
          scrub: true,
          start: "88% bottom",
          end: "+=30%",
          trigger: "#home",
          pin: "#pin",
        },
      });

      gsap.set(left_sign.current, {
        scale: 1,
        x: "-100%",
        y: "-120%",
      });
      gsap.set(right_sign.current, {
        scale: 1,
        x: "170%",
        y: "30%",
      });
      gsap.set(sign_heading.current, {
        textAlign: "center",
        y: "-1600%",
        opacity: 0,
      });
      gsap.set(sign_text.current, {
        x: "50%",
        y: "-500%",
        opacity: 0,
      });
      gsap.set("#btn_container", {
        y: "-1300%",
        opacity: 0,
      });

      // animation timeline is here
      tl.to(
        left_sign.current,
        {
          x: "0%",
        },
        0
      );
      tl.to(
        right_sign.current,
        {
          x: "70%",
        },
        0
      );
      tl.to(
        sign_heading.current,
        {
          y: "-1500%",
          opacity: 1,
        },
        0
      );
      tl.to(
        sign_text.current,
        {
          y: "-400%",
          opacity: 1,
        },
        0
      );
      tl.to(
        "#btn_container",
        {
          y: "-1200%",
          opacity: 1,
        },
        0
      );
    }
  }, []);

  const id = new Date().getTime().toString();
  // creating room
  async function createRoom() {
    await setDoc(doc(firestore, `chats`, id), {
      uid: [uid, "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3"],
      title: username,
      id: id,
      read: [
        { uid: uid, read: true },
        { uid: "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3", read: true },
      ],
    });

    toast.success("New Chat created");
    router.push(`/chats/${id}`);
  }

  // check room
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getDocs(
          query(
            collection(firestore, `chats`),
            where("uid", "array-contains", auth.currentUser?.uid)
          )
        ).then((res) => {
          let array = res.docs.map((data) => {
            return data.data();
          });

          if (array.length === 0) {
            setRoom(id);
            setRoomExists(false);
            setRender(!render);
          } else {
            setRoom(array[0].id);
            setRoomExists(true);
            setRender(!render);
          }
        });
      }
    });
  }, [router.query]);

  return (
    <div className={styles.home_container} id="home">
      {loading && <Transition right={false} />}
      <Metatags
        title={`Home`}
        description={`Fight your nafs focuses on improving your everyday rituals and help you become the better you for the future, for the community.`}
        image={`logo.png`}
      />
      <div className={styles.socials_container}>
        <a
          href="https://www.facebook.com/Fight-Your-Nafs-110451648355031"
          target="_blank"
          id="social"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://www.instagran.com/fightyournafsofficial"
          target="_blank"
          id="social"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://www.facebook.com/fightyournafsofficial"
          target="_blank"
          id="social"
        >
          <WhatsAppIcon />
        </a>
      </div>
      <button
        className={styles.message_container}
        onClick={async () => {
          if (username_set) {
            if (roomExists) {
              setLoading(true);
              await router.push(`/chats/${room}`);
            } else {
              setLoading(true);
              await createRoom();
            }
          }
        }}
      >
        {!notification && <div className={styles.noti}>1</div>}
        <ChatIcon />
      </button>
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
      {steps.map(({ src, steps_info, img_ref, text_ref, id, heading }) => {
        return (
          <section className={styles.steps_container} key={id}>
            <div className={styles.step}>
              <div className={styles.steps_vector} ref={img_ref}>
                <img
                  src={src}
                  alt="There is an image"
                  className={styles.step_images}
                />
              </div>
              <div className={styles.steps_text} ref={text_ref}>
                <h1>{heading}</h1>
                <p>{steps_info}</p>
              </div>
            </div>
          </section>
        );
      })}
      <div className={styles.sign_up_container} id="pin">
        <svg
          width="248"
          height="294"
          viewBox="0 0 248 294"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={left_sign}
        >
          <path
            d="M179 60C211.4 50 238.167 20.5 247.5 7L-14.5 0.5L-20.5 85L-32 293.5C-17.8333 281.5 15.7 252.1 36.5 230.5C62.5 203.5 66.5 179.5 82.5 148C98.5 116.5 138.5 72.5 179 60Z"
            fill="#FF8E7E"
          />
        </svg>
        <svg
          ref={right_sign}
          width="264"
          height="236"
          viewBox="0 0 264 236"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M238 4.9999C270 -7.8001 292.667 10.3332 300 20.9999L304.5 219.5L205.5 235.5C170.667 230.5 -35.5001 241.5 6.49996 198.5C48.5 155.5 54.6904 152.342 70.0001 142.5C91.0001 129 151 94 176 68C201 42 198 20.9999 238 4.9999Z"
            fill="#FF8E7E"
          />
        </svg>
        <div>
          <h1 ref={sign_heading}>Sign Up Process</h1>
          <p ref={sign_text}>
            We keep your identity hidden while you are signed up so you feel
            free to ask any question you may!
          </p>
          <div id="btn_container">
            <Link href="/sign-in">
              <button className="try-btn" type="button">
                TRY FOR FREE
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.swipe_container} ref={swipe_down}>
        <SwipeDownAltIcon />
        <p>Swipe down for more</p>
      </div>
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  );
}
