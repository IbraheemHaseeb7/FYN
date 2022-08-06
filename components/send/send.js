import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { useState } from "react";
import { firestore } from "../../libraries/firebase";
import styles from "./send.module.css";
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/router";

export default function Send({ room_id, array, setRead }) {
  const [value, setValue] = useState("");
  const { username, uid } = useContext(UserContext);
  const router = useRouter();

  function handleChange(e) {
    setValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const id = new Date().getTime().toString();

    setValue("");

    await setDoc(doc(firestore, `chats/${room_id}/messages`, id), {
      message: value,
      uid: uid,
      id: id,
    });

    setRead(false);

    let thisOne;
    let otherUid;

    for (let counter = 0; counter < array.read.length; counter++) {
      if (uid === array.read[counter].uid) {
        thisOne = array.read[counter];
      }
    }
    for (let counter = 0; counter < array.uid.length; counter++) {
      if (uid !== array.uid[counter]) {
        otherUid = array.uid[counter];
      }
    }

    let final = [thisOne, { uid: otherUid, read: false }];

    for (let counter = 0; counter < final.length; counter++) {
      if (undefined === array.read[counter]) {
        final.splice(counter - 1, 1);
      }
    }

    await updateDoc(doc(firestore, `chats`, router.query?.rooms), {
      read: final,
    });
  }

  return (
    <form className={styles.form_container}>
      <textarea
        placeholder="Start typing from here..."
        value={value}
        name="message"
        onChange={handleChange}
      ></textarea>
      <button type="button" onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
}
