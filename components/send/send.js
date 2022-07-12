import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { useState } from "react";
import { firestore } from "../../libraries/firebase";
import styles from "./send.module.css";
import { UserContext } from "../../pages/_app";

export default function Send({ room_id }) {
  const [value, setValue] = useState("");
  const { username, uid } = useContext(UserContext);

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
