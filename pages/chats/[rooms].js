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
} from "firebase/firestore";
import SignCheck from "../../protectors/signCheck";
import UsernameCheck from "../../protectors/usernameCheck";
import Metatags from "../../components/meta/meta";
import { UserContext } from "../_app";

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
  const [read, setRead] = useState();

  async function readIt() {
    let thisOne;

    for (let counter = 0; counter < array.read.length; counter++) {
      if (uid !== array.read[counter].uid) {
        thisOne = array.read[counter];
        setRead(array.read[counter].read);
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
    <SignCheck>
      <UsernameCheck>
        <Metatags title={`ChatRoom`} image={`logo.png`} />
        <div className={styles.main_container} key={1} onMouseLeave={readIt}>
          <ChatBox messages={messages} />
          <Send room_id={router.query?.rooms} array={array} setRead={setRead} />
        </div>
      </UsernameCheck>
    </SignCheck>
  );
}
