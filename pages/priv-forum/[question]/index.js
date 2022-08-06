import styles from "../../../styles/question.module.css";
import Footer from "../../../components/footer/footer";
import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore";
import { firestore } from "../../../libraries/firebase";
import { useContext } from "react";
import { UserContext } from "../../_app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import SignCheck from "../../../protectors/signCheck";
import UsernameCheck from "../../../protectors/usernameCheck";
import Metatags from "../../../components/meta/meta";
import PortalBar from "../../../components/portalbar/portalbar";

export async function getStaticProps(data) {
  const id = data.params.question;

  let array = null;
  let comms = [];

  await getDoc(doc(firestore, "privateForum", id)).then((res) => {
    array = res.data();
  });

  await getDocs(
    query(
      collection(firestore, `/privateForum/${id}/comments`),
      orderBy("id", "desc"),
      limit(1)
    )
  ).then((data) => {
    comms = data.docs.map((data) => {
      return data.data();
    });
  });
  return {
    props: {
      question: array.question,
      answer: array.details,
      id: array.id,
    },
    revalidate: 10000,
  };
}

export async function getStaticPaths() {
  let array = [];

  await getDocs(collection(firestore, "privateForum")).then((res) => {
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
  const [lastCheck, setLastCheck] = useState(false);
  const [render, setRender] = useState(false);
  const [comments, setComments] = useState([]);
  const [cursor, setCursor] = useState("");
  const LIMIT = 20;
  const [width, setWidth] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    let unsub = onSnapshot(
      query(
        collection(firestore, `/privateForum/${id}/comments`),
        orderBy("id", "desc"),
        limit(LIMIT)
      ),
      (data) => {
        let array = data.docs.map((data) => {
          return data.data();
        });

        let prevData = comments;
        console.log(prevData);

        setComments(array);
        setCursor(array[array.length - 1]?.id);
      }
    );

    return unsub;
  }, [router.query]);

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

    await setDoc(doc(firestore, `/privateForum/${id}/comments`, comId), {
      message: value,
      waqt: waqt,
      sender: username,
      id: comId,
    });

    toast.success("New Comment added");

    setValue("");
  }

  async function loadMore() {
    if (comments.length !== 0) {
      await getDocs(
        query(
          collection(firestore, `/privateForum/${id}/comments`),
          orderBy("id", "desc"),
          limit(LIMIT - 10),
          startAfter(cursor)
        )
      ).then((data) => {
        let array = comments;

        data.docs.map((data) => {
          return array.push(data.data());
        });

        setComments(array);
        setRender(!render);
      });

      if (comments.length < LIMIT - 10) {
        setLastCheck(true);
      } else {
        setLastCheck(false);
      }
    } else {
      setLastCheck(true);
    }
  }

  return (
    <>
      {!width && <PortalBar />}
      <div
        className={styles.question_container}
        style={
          !width
            ? { width: "calc(100% - 13rem)", marginLeft: "13rem" }
            : { width: "100%", marginLeft: "0rem" }
        }
      >
        <Metatags title={question} description={answer} image={`logo.png`} />
        <div className={styles.ques_and_ans}>
          <h1 style={{ width: "90%" }}>{question}</h1>
          <p>{answer}</p>
        </div>
        <div className={styles.form_align}>
          <SignCheck>
            <UsernameCheck>
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
            </UsernameCheck>
          </SignCheck>
        </div>
        <div className={styles.comments_container}>
          {comments.map(({ waqt, sender, message, id }) => {
            return (
              <div className={styles.comment} key={id}>
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
        <div className={styles.load_btn_container}>
          {!lastCheck && (
            <button type="button" onClick={loadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", zIndex: 10, width: "100%" }}>
        <Footer />
      </div>
    </>
  );
}
