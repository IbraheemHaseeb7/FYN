import { useState } from "react";
import Preview from "./preview";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import styles from "./popup.module.css";

export default function Announcement() {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const id = new Date().getTime().toString();

    await setDoc(doc(firestore, `/blog`, id), {
      id: id,
      content: value,
      date: new Date(),
    });

    setValue("");
  }

  return (
    <form className={styles.announcement_container}>
      <h1>Start writing from here</h1>
      <textarea
        placeholder="Type your announcement here..."
        className={styles.textarea_announcement}
        value={value}
        name={`content`}
        onChange={handleChange}
      ></textarea>
      <Preview content={value} />
      <button className={styles.submitBtn} type="button" onClick={handleSubmit}>
        SUBMIT
      </button>
    </form>
  );
}
