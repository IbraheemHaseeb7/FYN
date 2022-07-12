import styles from "../../../styles/adminchat.module.css";
import ChatBox from "../../../components/chatBox/chatBox";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../libraries/firebase";
import Send from "../../../components/send/send";

export default function Rooms() {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let unsub = onSnapshot(
      collection(firestore, `/chats/${router.query?.rooms}/messages`),
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
