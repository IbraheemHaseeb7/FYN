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
import Level1 from "../../protectors/level1";
import Level2 from "../../protectors/level2";
import Level3 from "../../protectors/level3";

export async function getStaticProps() {
  let blogs,
    level2,
    level3,
    ebook = [];

  await getDocs(
    query(
      collection(firestore, "lessons"),
      where("level1", "==", true),
      orderBy("id", "desc"),
      limit(10)
    )
  ).then((res) => {
    blogs = res.docs.map((data) => {
      return data.data();
    });
  });
  await getDocs(
    query(
      collection(firestore, "lessons"),
      where("level2", "==", true),
      orderBy("id", "desc"),
      limit(10)
    )
  ).then((res) => {
    level2 = res.docs.map((data) => {
      return data.data();
    });
  });
  await getDocs(
    query(
      collection(firestore, "lessons"),
      where("level3", "==", true),
      orderBy("id", "desc"),
      limit(10)
    )
  ).then((res) => {
    level3 = res.docs.map((data) => {
      return data.data();
    });
  });
  await getDocs(
    query(
      collection(firestore, "lessons"),
      where("ebook", "==", true),
      orderBy("id", "desc"),
      limit(10)
    )
  ).then((res) => {
    ebook = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: {
      blogs,
      level2,
      level3,
      ebook,
    },
    revalidate: 10,
  };
}

export default function Blogs({ blogs, level2, level3, ebook }) {
  // level 1
  const [view, setView] = useState(blogs);
  const [render, setRender] = useState(false);
  const [last, setLast] = useState(false);

  // level 2
  const [lvl2, setLvl2] = useState(level2);
  const [last2, setLast2] = useState(false);

  // level 3
  const [lvl3, setLvl3] = useState(level3);
  const [last3, setLast3] = useState(false);

  async function loadMoreLevel1() {
    let last = blogs[blogs.length - 1].id;
    let array;

    await getDocs(
      query(
        collection(firestore, `lessons`),
        where("level1", "==", true),
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
  async function loadMoreLevel2() {
    let last = level2[level2.length - 1].id;
    let array;

    await getDocs(
      query(
        collection(firestore, `lessons`),
        where("level2", "==", true),
        orderBy("id", "desc"),
        limit(10),
        startAfter(last)
      )
    ).then((res) => {
      array = level2;

      res.docs.map((data) => {
        return array.push(data);
      });

      setLvl2(array);
      setRender(!render);
    });

    if (array.length < 10) {
      setLast2(true);
    } else {
      setLast2(false);
    }
  }
  async function loadMoreLevel3() {
    let last = level3[level3.length - 1].id;
    let array;

    await getDocs(
      query(
        collection(firestore, `lessons`),
        where("level3", "==", true),
        orderBy("id", "desc"),
        limit(10),
        startAfter(last)
      )
    ).then((res) => {
      array = level3;

      res.docs.map((data) => {
        return array.push(data);
      });

      setLvl3(array);
      setRender(!render);
    });

    if (array.length < 10) {
      setLast3(true);
    } else {
      setLast3(false);
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
                <h1>Search Lessons of your Choice</h1>
              </div>
              <>
                <h1 className={styles.level_heading}>Level 1</h1>
                <Level1>
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
                </Level1>
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
              <>
                <h1 className={styles.level_heading}>Level 2</h1>
                <Level2>
                  <div className={styles.blogs}>
                    {lvl2.map(({ title, tags, waqt, id, src, level }) => {
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
                </Level2>
                <div className={styles.load_container}>
                  {!last2 && (
                    <button
                      className={styles.load_more}
                      onClick={loadMoreLevel2}
                    >
                      Load More
                    </button>
                  )}
                </div>
              </>
              <>
                <h1 className={styles.level_heading}>Level 3</h1>
                <Level3>
                  <div className={styles.blogs}>
                    {lvl3.map(({ title, tags, waqt, id, src, level }) => {
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
                  {!last3 && (
                    <button
                      className={styles.load_more}
                      onClick={loadMoreLevel3}
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
