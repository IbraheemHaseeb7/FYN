import styles from "../../styles/forums.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Footer from "../../components/footer/footer";
import { useState, useRef } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import Link from "next/link";

export async function getServerSideProps(data) {
  let array = [];

  await getDocs(
    query(collection(firestore, "forum"), orderBy("id", "asc"), limit(5))
  ).then((res) => {
    array = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: { array },
  };
}

export default function Forums({ array }) {
  const [render, setRender] = useState(array);
  const [okay, setOkay] = useState(true);
  const [last, setLast] = useState(false);

  const answerDiv = useRef();

  function openIt(e) {
    let data = e.target.dataset.value;
    let array = render;
    array.forEach((value, index, arr) => {
      if (arr[index].id === data) {
        arr[index].open = !arr[index].open;
      }
    });

    setOkay(!okay);
    setRender(array);
  }

  async function loadMore() {
    const last = render[render.length - 1];

    await getDocs(
      query(
        collection(firestore, "forum"),
        orderBy("id", "asc"),
        limit(5),
        startAfter(last.id)
      )
    ).then((res) => {
      let array = render;

      let thisTime = res.docs.map((data) => {
        array.push(data.data());
      });

      setOkay(!okay);
      setRender(array);

      if (thisTime.length < 5) {
        setLast(true);
      }
    });
  }

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
        {render.map(({ waqt, question, open, answer, id }) => {
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
                <span>{waqt}</span>
                <Link href={`/forums/${id}`}>
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
                </Link>
              </div>
            </div>
          );
        })}
        {last ? (
          <p></p>
        ) : (
          <button type="button" className={styles.load_more} onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
