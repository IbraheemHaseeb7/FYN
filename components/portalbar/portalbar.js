import styles from "./portalbar.module.css";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../libraries/firebase";
import { toast } from "react-hot-toast";
import useChat from "../../hooks/chat";

export default function PortalBar() {
  const option = [
    { name: "Home", address: "/" },
    { name: "Blogs", address: "/blogs" },
    { name: "Videos", address: "/videos" },
    { name: "Public Forum", address: "/forums" },
    { name: "Sign In", address: "/sign-in" },
    { name: "Packages", address: "/packages" },
  ];

  const room = useChat();

  return (
    <div className={styles.main_container}>
      <div className={styles.options_container}>
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
        {room === "" ? (
          <button
            className={styles.option}
            type="button"
            onClick={() => {
              toast.error("Please create a chat first");
            }}
          >
            Chat with admin
          </button>
        ) : (
          <Link href={`/chats/${room}`}>
            <button className={styles.option} type="button">
              Chat with admin
            </button>
          </Link>
        )}
        <button type="button" className={styles.option}>
          Post new Question
        </button>
        <button
          type="button"
          onClick={() => {
            signOut(auth);

            toast.success("Signed Out Successfully");
          }}
          className={styles.option}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
