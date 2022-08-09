import styles from "../../styles/priv.module.css";
import PortalBar from "../../components/portalbar/portalbar";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../libraries/firebase";
import { useState, useEffect } from "react";
import Footer from "../../components/footer/footer";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import Metatags from "../../components/meta/meta";

export async function getServerSideProps(data) {
  let uid = data.params.your;
  let array = [];

  await getDocs(
    query(
      collection(firestore, "privateForum"),
      where("uid", "==", uid),
      limit(20),
      orderBy("id", "desc")
    )
  ).then((res) => {
    array = res.docs.map((res) => {
      return res.data();
    });
  });

  return {
    props: { array, uid },
  };
}

export default function PrivateForum({ array, uid }) {
  const [render, setRender] = useState(array);
  const [okay, setOkay] = useState(true);
  const [last, setLast] = useState(false);

  const [width, setWidth] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth < 768);
  }, []);

  async function loadMore() {
    if (render.length !== 0) {
      const last = render[render.length - 1];

      await getDocs(
        query(
          collection(firestore, "privateForum"),
          orderBy("id", "desc"),
          limit(30),
          where("uid", "==", uid),
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
    } else {
      setLast(true);
    }
  }

  return (
    <div className={styles.main_container}>
      <Metatags
        title="Your Questions on Forum"
        description={``}
        image="logo.png"
      />
      <div
        style={
          !width
            ? { zIndex: "2", position: "absolute" }
            : { zIndex: "2", position: "absolute", display: "none" }
        }
      >
        <PortalBar />
      </div>
      <div className={styles.forum_container}>
        <h1>Your Questions</h1>
        <div className={styles.questions_container}>
          {array.map(({ id, question, uid, username, waqt }) => {
            return (
              <div className={styles.question}>
                <div className={styles.circle}>
                  <div></div>
                  <p>{username}</p>
                </div>
                <h3>{question}</h3>
                <div className={styles.time}>
                  <p>{waqt}</p>
                  <Link href={`/priv-forum/${id}`}>
                    <button className={styles.readmore} type="button">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          {last ? (
            <p></p>
          ) : (
            <button
              type="button"
              className={styles.readmore}
              onClick={loadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", zIndex: 5, width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
}
