import styles from "../../styles/blogs.module.css";
import ReactMarkdown from "react-markdown";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import Footer from "../../components/footer/footer";

export async function getStaticProps(data) {
  const id = data.params.blogs;

  let array = [];

  await getDoc(doc(firestore, "blogs", id)).then((res) => {
    array = res.data();
  });

  return {
    props: {
      title: array.title,
      tags: array.tags,
      waqt: array.waqt,
      content: array.content,
      id: array.id,
    },
  };
}

export async function getStaticPaths() {
  let array = [];

  await getDocs(collection(firestore, "blogs")).then((res) => {
    array = res.docs.map((data) => {
      const { id } = data.data();

      return { params: { blogs: id } };
    });
  });

  return {
    paths: array,
    fallback: "blocking",
  };
}

export default function Blogs({ title, tags, id, content, waqt }) {
  return (
    <div className={styles.blog_container}>
      <div className={styles.inner_blog_container}>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Times new Roman",
            fontSize: "3.5rem",
          }}
        >
          {title}
        </h1>
        <div className={styles.content_container}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className={styles.tags_container}>
          <span>TAGS</span>
          {tags.map((data) => {
            return <p key={data}>{data}</p>;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
