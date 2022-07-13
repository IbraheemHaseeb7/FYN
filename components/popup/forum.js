import { useState } from "react";
import Preview from "./preview";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import styles from "./popup.module.css";
import { toast } from "react-hot-toast";

export default function Forum() {
  const [value, setValue] = useState({
    answer: "",
    question: "",
  });

  function handleChange(e) {
    let values = e.target.value;
    let name = e.target.name;

    setValue({ ...value, [name]: values });
  }

  const date = new Date().toString();
  const month = date.substring(4, 7);
  const day = date.substring(8, 10);
  const year = date.substring(11, 15);

  const waqt = day + " " + month + ", " + year;

  async function handleSubmit(e) {
    e.preventDefault();

    const id = new Date().getTime().toString();

    if (value.question && value.answer) {
      await setDoc(doc(firestore, `/forum`, id), {
        id: id,
        question: value.question,
        answer: value.answer,
        waqt: waqt,
        open: false,
      });

      toast.success("Question successfully uploaded on forum page");
      setValue({
        answer: "",
        question: "",
      });
    } else {
      toast.error("Please fill out all the fields");
    }
  }

  return (
    <form className={styles.announcement_container}>
      <h1>Start writing from here</h1>
      <input
        className={styles.input}
        name="question"
        value={value.question}
        placeholder="Enter your question here"
        onChange={handleChange}
      />
      <textarea
        placeholder="Type your answer here..."
        className={styles.textarea_announcement}
        value={value.answer}
        name={`answer`}
        onChange={handleChange}
      ></textarea>

      <Preview content={value.answer} title={value.question} />
      <button className={styles.submitBtn} type="button" onClick={handleSubmit}>
        SUBMIT
      </button>
    </form>
  );
}
