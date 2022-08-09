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
} from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import { useState } from "react";
import Metatags from "../../components/meta/meta";

export async function getStaticProps() {
  let blogs = [];

  await getDocs(
    query(collection(firestore, "blogs"), orderBy("id", "desc"), limit(10))
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
  const [view, setView] = useState(blogs);
  const [render, setRender] = useState(false);
  const [last, setLast] = useState(false);

  async function loadMore() {
    let last = blogs[blogs.length - 1].id;
    let array;

    await getDocs(
      query(
        collection(firestore, `blogs`),
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
    <div className={styles.blogs_container}>
      <Metatags
        title={`Blogs`}
        description={`A place where you can learn more about fight your nafs and read free of cost.`}
        image={`logo.png`}
      />
      <div className={styles.title_container}>
        <h1>Search Blogs of your Choice</h1>
      </div>
      <div className={styles.blogs}>
        {view.map(({ title, tags, waqt, id, src }) => {
          return (
            <Link href={`/blogs/${id}`} key={id}>
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
      <Footer />
    </div>
  );
}
