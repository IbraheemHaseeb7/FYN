import styles from "./portalbar.module.css";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../libraries/firebase";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useRef, useState } from "react";
import Popup from "../popup/popup";
import Priv from "../popup/priv";
import { useReducer } from "react";
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/router";
import Transition from "../transition/transition";

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        [action.payload.name]: !action.payload.value,
      };

    case "close":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
  }
}

export default function PortalBar() {
  const option = [
    { name: "Home", address: "/" },
    { name: "Blogs", address: "/blogs" },
    { name: "Videos", address: "/videos" },
    { name: "Public Forum", address: "/forums" },
    { name: "Sign In", address: "/sign-in" },
    { name: "Packages", address: "/packages" },
    { name: "Portal", address: "/portal" },
  ];
  const { uid, username, room, notification } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, {
    priv: false,
  });
  const router = useRouter();
  const options = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let children = options.current.childNodes;
    children.forEach((data) => {
      if (data.nodeName == "BUTTON") {
        data.addEventListener("click", () => {
          setLoading(true);
        });
      }
    });
  }, []);

  async function createRoom() {
    setLoading(true);

    await setDoc(doc(firestore, `chats`, id), {
      uid: [uid, "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3"],
      title: username,
      id: id,
      read: [
        { uid: uid, read: true },
        { uid: "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3", read: true },
      ],
    });
    router.push(`/chats/${id}`);
  }

  return (
    <div className={styles.main_container}>
      {loading && <Transition right={true} />}
      <div className={styles.options_container} ref={options}>
        <h2 style={{ margin: "0.5rem 0" }}>{username}</h2>
        <h3>Navigations</h3>
        {option.map(({ name, address }) => {
          return (
            <Link href={address}>
              <button className={styles.option} type="button">
                {name}
              </button>
            </Link>
          );
        })}
        <h3>Features</h3>
        <Link href="/priv-forum">
          <button className={styles.option} type="button">
            Private Forum
          </button>
        </Link>
        <Link href="/ebook">
          <button className={styles.option} type="button">
            eBook
          </button>
        </Link>
        {room === "" ? (
          <button className={styles.option} type="button" onClick={createRoom}>
            Chat with admin
          </button>
        ) : (
          <>
            <Link href={`/chats/${room}`}>
              <button className={styles.option} type="button">
                {!notification && <div>1</div>}
                Chat with admin
              </button>
            </Link>
          </>
        )}
        <button
          type="button"
          className={styles.option}
          onClick={() => {
            dispatch({
              type: "open",
              payload: { name: "priv", value: state.priv },
            });
          }}
        >
          Post new Question
        </button>
        <Link href={`/lessons`}>
          <button className={styles.option} type="button">
            Lessons
          </button>
        </Link>
        <Link href={`/${uid}`}>
          <button className={styles.option} type="button">
            Your Questions
          </button>
        </Link>
        {uid === "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3" && (
          <Link href={`/admin`}>
            <button className={styles.option} type="button">
              Admin Portal
            </button>
          </Link>
        )}
        <button
          type="button"
          onClick={() => {
            signOut(auth);

            toast.success("Signed Out Successfully");
            router.push("/sign-in");
          }}
          className={styles.option}
        >
          Sign Out
        </button>
      </div>
      {state.priv && (
        <Popup title={`Post a new question!`} name="priv" dispatch={dispatch}>
          <Priv />
        </Popup>
      )}
    </div>
  );
}
