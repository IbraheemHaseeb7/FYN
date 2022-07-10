import styles from "../../styles/forums.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Footer from "../../components/footer/footer";
import { useState } from "react";

let forums = [
  {
    date: "22 June, 2022",
    question: "How long is this course?",
    answer:
      "This is a 3 month long course where you will be guided not only how to refrain from pornography but also you will be given a series of diets and exercise that will help you build a perfect character",
    link: "https://www.youtube.com",
    open: false,
  },
  {
    date: "22 June, 2022",
    question: "How long is this course?",
    answer:
      "This is a 3 month long course where you will be guided not only how to refrain from pornography but also you will be given a series of diets and exercise that will help you build a perfect character",
    link: "https://www.youtube.com",
    open: false,
  },
  {
    date: "22 June, 2022",
    question: "How long is this course?",
    answer:
      "This is a 3 month long course where you will be guided not only how to refrain from pornography but also you will be given a series of diets and exercise that will help you build a perfect character",
    link: "https://www.youtube.com",
    open: false,
  },
];

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
        "This is a 3 month long course where you will be guided not only how to refrain from pornography but also you will be given a series of diets and exercise that will help you build a perfect character",
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

  console.log(render);

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
              onClick={(e) => {
                let data = e.target.dataset.value;

                let array = render;

                array.forEach((value, index, arr) => {
                  if (arr[index].id === parseInt(data)) {
                    arr[index].open = !arr[index].open;
                  }
                });
                setRender(array);
              }}
              data-value={id}
            >
              <p>{question}</p>
              <ArrowDropDownIcon />
              {open && <p>{answer}</p>}
              {open && <span>{date}</span>}
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
