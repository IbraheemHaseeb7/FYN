import styles from "../../styles/allblogs.module.css";
import Footer from "../../components/footer/footer";
import Link from "next/link";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import { useState } from "react";
import Metatags from "../../components/meta/meta";
import SignCheck from "../../protectors/signCheck";
import UsernameCheck from "../../protectors/usernameCheck";
import Levels from "../../protectors/levels";
import Level3 from "../../protectors/level3";

export async function getStaticProps() {
  let blogs = [];

  await getDocs(
    query(
      collection(firestore, "lessons"),
      where("ebook", "==", true),
      orderBy("id", "desc"),
      limit(10)
    )
  ).then((res) => {
    blogs = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: {
      blogs,
    },
    revalidate: 10,
  };
}

export default function Blogs({ blogs }) {
  // level 1
  const [view, setView] = useState(blogs);
  const [render, setRender] = useState(false);
  const [last, setLast] = useState(false);

  async function loadMoreLevel1() {
    let last = blogs[blogs.length - 1].id;
    let array;

    await getDocs(
      query(
        collection(firestore, `lessons`),
        where("ebook", "==", true),
        orderBy("id", "desc"),
        limit(10),
        startAfter(last)
      )
    ).then((res) => {
      array = blogs;

      res.docs.map((data) => {
        return array.push(data);
      });

      setView(array);
      setRender(!render);
    });

    if (array.length < 10) {
      setLast(true);
    } else {
      setLast(false);
    }
  }

  return (
    <>
      <SignCheck>
        <UsernameCheck>
          <Levels>
            <div className={styles.blogs_container}>
              <Metatags
                title={`Lessons`}
                description={`Subscribe to our services and unlock lots of worksheets and videos that help you leave your bad addictions and become the better you`}
                image={`logo.png`}
              />
              <div className={styles.title_container}>
                <h1>Search eBooks of your Choice</h1>
              </div>
              <>
                <Level3>
                  <div className={styles.blogs}>
                    {view.map(({ title, tags, waqt, id, src, level }) => {
                      return (
                        <Link href={`/lessons/${id}`} key={id}>
                          <div className={styles.one_blog}>
                            <div className={styles.blog_pic}>
                              <img src={src} alt="image" />
                            </div>
                            <div className={styles.blog_title}>
                              <h1>{title}</h1>
                            </div>
                            <div className={styles.tags_and_date}>
                              <span>{waqt}</span>
                              <div>
                                {tags.map((tag) => {
                                  return <p>{tag}</p>;
                                })}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </Level3>
                <div className={styles.load_container}>
                  {!last && (
                    <button
                      className={styles.load_more}
                      onClick={loadMoreLevel1}
                    >
                      Load More
                    </button>
                  )}
                </div>
              </>
              <Footer />
            </div>
          </Levels>
        </UsernameCheck>
      </SignCheck>
    </>
  );
}
