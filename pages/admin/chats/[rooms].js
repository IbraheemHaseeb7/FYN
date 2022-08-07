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
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../libraries/firebase";
import Send from "../../../components/send/send";
import AdminCheck from "../../../protectors/adminCheck";
import { UserContext } from "../../_app";
import useOtherRead from "../../../hooks/otherRead";

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
  const read = useOtherRead();

  async function readIt() {
    let thisOne;

    for (let counter = 0; counter < array.read.length; counter++) {
      if (uid !== array.read[counter].uid) {
        thisOne = array.read[counter];
      }
    }

    const otherUid = thisOne?.uid;

    let final = [
      { uid: otherUid, read: read },
      { uid: uid, read: true },
    ];

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
      query(
        collection(firestore, `/chats/${router.query?.rooms}/messages`),
        limit(100),
        orderBy("id", "desc")
      ),
      (data) => {
        let array = messages;

        array = data.docs.map((data) => {
          return data.data();
        });

        setMessages(array.reverse());
      }
    );

    return unsub;
  }, [router.query?.rooms]);

  return (
    <AdminCheck>
      <div className={styles.main_container} onMouseLeave={readIt}>
        <ChatBox messages={messages} setMessages={setMessages} />
        <Send room_id={router.query?.rooms} array={array} />
      </div>
    </AdminCheck>
  );
}
