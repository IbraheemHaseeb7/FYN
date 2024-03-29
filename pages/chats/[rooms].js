import { useEffect, useState, useContext } from "react";
import ChatBox from "../../components/chatBox/chatBox";
import Send from "../../components/send/send";
import styles from "../../styles/chats.module.css";
import { useRouter } from "next/router";
import { auth, firestore } from "../../libraries/firebase";
import {
  collection,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import SignCheck from "../../protectors/signCheck";
import UsernameCheck from "../../protectors/usernameCheck";
import Metatags from "../../components/meta/meta";
import { UserContext } from "../_app";
import useOtherRead from "../../hooks/otherRead";

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
  const router = useRouter();
  const [messages, setMessages] = useState([]);
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
        collection(firestore, `chats/${router.query?.rooms}/messages`),
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
    <SignCheck>
      <UsernameCheck>
        <Metatags title={`ChatRoom`} image={`logo.png`} />
        <div className={styles.main_container} key={1} onMouseLeave={readIt}>
          <ChatBox messages={messages} setMessages={setMessages} />
          <Send room_id={router.query?.rooms} array={array} />
        </div>
      </UsernameCheck>
    </SignCheck>
  );
}
