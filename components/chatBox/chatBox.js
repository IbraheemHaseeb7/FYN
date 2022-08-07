import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useContext, useRef } from "react";
import { firestore } from "../../libraries/firebase";
import { UserContext } from "../../pages/_app";
import styles from "./chat.module.css";

export default function ChatBox({ messages, setMessages }) {
  const data = useContext(UserContext);
  const msg = useRef();
  const router = useRouter();
  const [last, setLast] = useState(false);

  useEffect(() => {
    msg.current.scrollTo(0, 100000);
  }, [messages]);

  let index = -1;

  async function loadMore(e) {
    e.preventDefault();

    let first = messages[0];
    let nowData = messages.reverse();
    let newData = [];

    await getDocs(
      query(
        collection(firestore, `chats/${router.query?.rooms}/messages`),
        limit(50),
        orderBy("id", "desc"),
        startAfter(first.id)
      )
    ).then((res) => {
      newData = res.docs.map((data) => {
        return nowData.push(data.data());
      });
    });

    nowData.reverse();
    setMessages(nowData);

    if (newData > 50) {
      setLast(false);
    } else {
      setLast(true);
    }
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.messages_container} ref={msg}>
        {!last && (
          <button className={styles.load} type="button" onClick={loadMore}>
            Load More
          </button>
        )}
        {messages.map(({ message, uid }) => {
          index++;
          return (
            <p
              style={
                data.uid !== uid
                  ? {
                      backgroundColor: "#d9d9d9",
                      color: "black",
                      alignSelf: "flex-start",
                    }
                  : {
                      backgroundColor: "#ff8e73",
                      color: "white",
                      alignSelf: "flex-end",
                    }
              }
              key={index}
            >
              {message}
            </p>
          );
        })}
      </div>
    </div>
  );
}
