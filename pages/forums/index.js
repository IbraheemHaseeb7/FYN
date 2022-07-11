import styles from "../../styles/forums.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Footer from "../../components/footer/footer";
import { useState, useRef } from "react";
import { useEffect } from "react";

export default function Forums() {
  const [render, setRender] = useState([
    {
      date: "22 June, 2022",
      question: "How long is this course?",
      answer:
        "This is a 3 month long course where you will be guided not only how to refrain from pornography but also you will be given a series of diets and exercise that will help you build a perfect character",
      link: "https://www.youtube.com",
      open: false,
      id: 1,
    },
    {
      date: "22 June, 2022",
      question: "How long is this course?",
      answer:
        "This is a 3 month long course where you will be guided not only how to refrain from pornography but also you will be given a series of diets and exercise that will help you build a perfect characterThis is a 3 month long course where you will be guided not only how to refrain from pornography but also you will be given a series of diets and exercise that will help you build a perfect character",
      link: "https://www.youtube.com",
      open: false,
      id: 2,
    },
    {
      date: "22 June, 2022",
      question: "How long is this course?",
      answer:
        "This is a 3 month long course where you will be guided not only how to refrain from pornography but also you will be given a series of diets and exercise that will help you build a perfect character",
      link: "https://www.youtube.com",
      open: false,
      id: 3,
    },
  ]);
  const [okay, setOkay] = useState(true);

  const answerDiv = useRef();

  function openIt(e) {
    let data = e.target.dataset.value;
    let array = render;
    array.forEach((value, index, arr) => {
      if (arr[index].id === parseInt(data)) {
        arr[index].open = !arr[index].open;
      }
    });

    setOkay(!okay);
    setRender(array);
  }

  useEffect(() => {
    console.log(answerDiv.current.offsetHeight);
  }, []);

  return (
    <div className={styles.forums_container}>
      <div className={styles.title_container}>
        <h1>Community Forum</h1>
        <p>
          A place where all of your questions will be answered and you are
          welcome to share your opinion on them. You only need to sign up that
          is free and allows you to keeo your identity hidden using our
          anonymous account handling.
        </p>
      </div>
      <div className={styles.forums}>
        {render.map(({ date, question, open, answer, id }) => {
          return (
            <div
              className={styles.forum}
              data-value={id}
              onClick={openIt}
              style={open ? { height: "auto" } : { height: "4rem" }}
            >
              <div className={styles.forum_question}>
                <p>{question}</p>
                <ArrowDropDownIcon />
              </div>
              <div className={styles.forum_answer} ref={answerDiv}>
                <p>{answer}</p>
                <span>{date}</span>
                <button
                  className={styles.load_more}
                  style={{
                    backgroundColor: "#d9d9d9",
                    padding: "0.5rem",
                    justifySelf: "end",
                  }}
                >
                  Read More
                </button>
              </div>
            </div>
          );
        })}
        <button type="button" className={styles.load_more}>
          Load More
        </button>
      </div>
      <Footer />
    </div>
  );
}
