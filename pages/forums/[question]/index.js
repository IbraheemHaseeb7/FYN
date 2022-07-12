import styles from "../../../styles/question.module.css";
import Footer from "../../../components/footer/footer";
import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../../libraries/firebase";
import { useContext } from "react";
import { UserContext } from "../../_app";
import { useEffect } from "react";
import { useRouter } from "next/router";

export async function getStaticProps(data) {
  const id = data.params.question;

  let array = null;

  await getDoc(doc(firestore, "forum", id)).then((res) => {
    array = res.data();
  });

  return {
    props: {
      question: array.question,
      answer: array.answer,
      id: array.id,
    },
  };
}

export async function getStaticPaths() {
  let array = [];

  await getDocs(collection(firestore, "forum")).then((res) => {
    array = res.docs.map((data) => {
      const { id } = data.data();

      return {
        params: { question: id },
      };
    });
  });

  return {
    paths: array,
    fallback: "blocking",
  };
}

export default function Question({ question, answer, id }) {
  const [value, setValue] = useState("");
  const { username } = useContext(UserContext);
  const router = useRouter();
  const [message, setMessage] = useState([]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const comId = new Date().getTime().toString();

    const date = new Date().toString();
    const month = date.substring(4, 7);
    const day = date.substring(8, 10);
    const year = date.substring(11, 15);

    const waqt = day + " " + month + ", " + year;

    await setDoc(doc(firestore, `/forum/${id}/comments`, comId), {
      message: value,
      waqt: waqt,
      sender: username,
    });

    setValue("");
  }

  useEffect(() => {
    let unsub = onSnapshot(
      collection(firestore, `/forum/${id}/comments`),
      (data) => {
        let array = message;

        array = data.docs.map((data) => {
          return data.data();
        });

        console.log(array);

        setMessage(array);
      }
    );

    return unsub;
  }, [router.query?.question]);

  return (
    <div className={styles.question_container}>
      <div className={styles.ques_and_ans}>
        <h1>{question}</h1>
        <p>{answer}</p>
      </div>
      <div className={styles.form_align}>
        <form className={styles.form_container}>
          <textarea
            placeholder="Start typing from here..."
            value={value}
            onChange={handleChange}
            name="message"
          ></textarea>
          <button type="button" onClick={handleSubmit}>
            Send
          </button>
        </form>
      </div>
      <div className={styles.comments_container}>
        {message.map(({ waqt, sender, message }) => {
          return (
            <div className={styles.comment}>
              <div className={styles.sender_container}>
                <div className={styles.sender_pic}></div>
                <p>{sender}</p>
              </div>
              <div className={styles.comment_container}>
                <p>{message}</p>
                <span>{waqt}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
