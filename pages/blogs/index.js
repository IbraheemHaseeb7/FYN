import styles from "../../styles/allblogs.module.css";
import Footer from "../../components/footer/footer";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";

export async function getServerSideProps() {
  let blogs = [];

  await getDocs(collection(firestore, "blogs")).then((res) => {
    blogs = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: {
      blogs,
    },
  };
}

export default function Blogs({ blogs }) {
  return (
    <div className={styles.blogs_container}>
      <div className={styles.title_container}>
        <h1>Search Blogs of your Choice</h1>
      </div>
      <div className={styles.blogs}>
        {blogs.map(({ title, tags, waqt, id }) => {
          return (
            <Link href={`/blogs/${id}`}>
              <div className={styles.one_blog}>
                <div className={styles.blog_pic}>
                  <img
                    src="https://thumbs.dreamstime.com/b/sad-man-sitting-couch-home-side-view-hand-head-living-room-83798202.jpg"
                    alt="image"
                  />
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
      <Footer />
    </div>
  );
}
