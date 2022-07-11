import styles from "../../../styles/question.module.css";
import Footer from "../../../components/footer/footer";
import { useState } from "react";

const question = "How long is this course?";
const answer =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi ipsam earum hic provident, molestiae, repudiandae mollitia tenetur ea nesciunt voluptate culpa iusto fugiat accusamus quasi enim veritatis. Voluptas sit, porro cupiditate omnis facere excepturi ipsum beatae voluptatibus perferendis quod ratione alias corrupti deserunt sunt id a maiores nisi autem accusamus!";

const message = [
  {
    time: "22 June, 2022",
    message: "Hello there how are you I love you...",
    sender: "user_1",
  },
  {
    time: "22 June, 2022",
    message: "Hello there how are you I love you...",
    sender: "user_1",
  },
  {
    time: "22 June, 2022",
    message: "Hello there how are you I love you...",
    sender: "user_1",
  },
];

export default function Question() {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setValue("");
  }

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
        {message.map(({ time, sender, message }) => {
          return (
            <div className={styles.comment}>
              <div className={styles.sender_container}>
                <div className={styles.sender_pic}></div>
                <p>{sender}</p>
              </div>
              <div className={styles.comment_container}>
                <p>{message}</p>
                <span>{time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
