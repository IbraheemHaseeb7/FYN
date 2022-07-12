import { useEffect, useState } from "react";
import ChatBox from "../../components/chatBox/chatBox";
import Send from "../../components/send/send";
import styles from "../../styles/chats.module.css";
import { useRouter } from "next/router";
import { firestore } from "../../libraries/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

export default function Rooms() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsub = onSnapshot(
      collection(firestore, `chats/${router.query?.rooms}/messages`),
      (data) => {
        let array = messages;

        array = data.docs.map((data) => {
          return data.data();
        });
        setMessages(array);
      }
    );

    return unsub;
  }, [router.query?.rooms]);

  return (
    <div className={styles.main_container}>
      <ChatBox messages={messages} />
      <Send room_id={router.query?.rooms} />
    </div>
  );
}
