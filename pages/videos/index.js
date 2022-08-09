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
import Level1 from "../../protectors/level1";
import Level2 from "../../protectors/level2";
import Level3 from "../../protectors/level3";

export async function getStaticProps() {
  let blogs,
    level1,
    level2,
    level3 = [];

  await getDocs(
    query(
      collection(firestore, "videos"),
      orderBy("id", "desc"),
      limit(10),
      where("public", "==", true)
    )
  ).then((res) => {
    blogs = res.docs.map((data) => {
      return data.data();
    });
  });

  // level 1
  await getDocs(
    query(
      collection(firestore, "videos"),
      orderBy("id", "desc"),
      limit(10),
      where("level1", "==", true)
    )
  ).then((res) => {
    level1 = res.docs.map((data) => {
      return data.data();
    });
  });

  // level 2
  await getDocs(
    query(
      collection(firestore, "videos"),
      orderBy("id", "desc"),
      limit(10),
      where("level2", "==", true)
    )
  ).then((res) => {
    level2 = res.docs.map((data) => {
      return data.data();
    });
  });

  // level 3
  await getDocs(
    query(
      collection(firestore, "videos"),
      orderBy("id", "desc"),
      limit(10),
      where("level3", "==", true)
    )
  ).then((res) => {
    level3 = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: {
      blogs,
      level1,
      level2,
      level3,
    },
    revalidate: 10,
  };
}

export default function Blogs({ blogs, level1, level2, level3 }) {
  const [view, setView] = useState(blogs);
  const [render, setRender] = useState(false);
  const [last, setLast] = useState(false);

  // level1
  const [lvl1, setLvl1] = useState(level1);
  const [last1, setLast1] = useState(false);
  // level2
  const [lvl2, setLvl2] = useState(level2);
  const [last2, setLast2] = useState(false);
  // level3
  const [lvl3, setLvl3] = useState(level3);
  const [last3, setLast3] = useState(false);

  async function loadMore() {
    let last = blogs[blogs.length - 1].id;
    let array;

    await getDocs(
      query(
        collection(firestore, `videos`),
        orderBy("id", "desc"),
        limit(10),
        startAfter(last),
        where("public", "==", true)
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

  // level 1
  async function loadMore1() {
    let last = level1[level1.length - 1]?.id;
    let array;

    await getDocs(
      query(
        collection(firestore, `videos`),
        orderBy("id", "desc"),
        limit(10),
        startAfter(last),
        where("level1", "==", true)
      )
    ).then((res) => {
      array = level1;

      res.docs.map((data) => {
        return array.push(data);
      });

      setLvl1(array);
      setRender(!render);
    });

    if (array.length < 10) {
      setLast1(true);
    } else {
      setLast1(false);
    }
  }
  // level 2
  async function loadMore2() {
    let last = level2[level2.length - 1]?.id;
    let array;

    await getDocs(
      query(
        collection(firestore, `videos`),
        orderBy("id", "desc"),
        limit(10),
        startAfter(last),
        where("level2", "==", true)
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
  // level 3
  async function loadMore3() {
    let last = level3[level3.length - 1]?.id;
    let array;

    await getDocs(
      query(
        collection(firestore, `videos`),
        orderBy("id", "desc"),
        limit(10),
        startAfter(last),
        where("level3", "==", true)
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
    <div className={styles.blogs_container}>
      <Metatags
        title={`Videos`}
        description={`Watch videos free of cost and learn more in a graphical manner`}
        image={`logo.png`}
      />
      <div className={styles.title_container}>
        <h1>Search Videos of your Choice</h1>
      </div>
      <>
        <h2>Public</h2>
        <div className={styles.blogs}>
          {view.map(({ title, tags, waqt, id, src }) => {
            return (
              <Link href={`/videos/${id}`} key={id}>
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
        <div className={styles.load_container}>
          {!last && (
            <button className={styles.load_more} onClick={loadMore}>
              Load More
            </button>
          )}
        </div>
      </>
      <>
        <h2>Level 1</h2>
        <Level1>
          <div className={styles.blogs}>
            {lvl1.map(({ title, tags, waqt, id, src }) => {
              return (
                <Link href={`/videos/${id}`} key={id}>
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
          <div className={styles.load_container}>
            {!last1 && (
              <button className={styles.load_more} onClick={loadMore1}>
                Load More
              </button>
            )}
          </div>
        </Level1>
      </>
      <>
        <h2>Level 2</h2>
        <Level2>
          <div className={styles.blogs}>
            {lvl2.map(({ title, tags, waqt, id, src }) => {
              return (
                <Link href={`/videos/${id}`} key={id}>
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
          <div className={styles.load_container}>
            {!last2 && (
              <button className={styles.load_more} onClick={loadMore2}>
                Load More
              </button>
            )}
          </div>
        </Level2>
      </>
      <>
        <h2>Level 3</h2>
        <Level3>
          <div className={styles.blogs}>
            {lvl3.map(({ title, tags, waqt, id, src }) => {
              return (
                <Link href={`/videos/${id}`} key={id}>
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
          <div className={styles.load_container}>
            {!last3 && (
              <button className={styles.load_more} onClick={loadMore3}>
                Load More
              </button>
            )}
          </div>
        </Level3>
      </>
      <Footer />
    </div>
  );
}
