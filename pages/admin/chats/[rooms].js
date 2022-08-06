import styles from "../../../styles/adminchat.module.css";
import ChatBox from "../../../components/chatBox/chatBox";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../libraries/firebase";
import Send from "../../../components/send/send";
import AdminCheck from "../../../protectors/adminCheck";
import { UserContext } from "../../_app";

export async function getServerSideProps(data) {
  const id = data.params.rooms;
  let array;

  await getDoc(doc(firestore, `chats`, id)).then((res) => {
    array = res.data();
  });

  return {
    props: { array: array },
  };
}

export default function Rooms({ array }) {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const { uid } = useContext(UserContext);

  async function readIt() {
    let thisOne;

    for (let counter = 0; counter < array.read.length; counter++) {
      if (uid !== array.read[counter].uid) {
        thisOne = array.read[counter];
      }
    }

    let final = [thisOne, { uid: uid, read: true }];

    for (let counter = 0; counter < final.length; counter++) {
      if (undefined === array.read[counter]) {
        final.splice(counter - 1, 1);
      }
    }

    await updateDoc(doc(firestore, `chats`, router.query?.rooms), {
      read: final,
    });
  }

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
    <AdminCheck>
      <div className={styles.main_container} onMouseLeave={readIt}>
        <ChatBox messages={messages} />
        <Send room_id={router.query?.rooms} array={array} />
      </div>
    </AdminCheck>
  );
}
