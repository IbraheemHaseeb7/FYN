import styles from "../../styles/blogs.module.css";
import ReactMarkdown from "react-markdown";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import Footer from "../../components/footer/footer";
import BlogCard from "../../components/blogCard/BlogCard";
import Metatags from "../../components/meta/meta";

export async function getStaticProps(data) {
  const id = data.params.blogs;

  let array = [];
  let blogs = [];

  await getDoc(doc(firestore, "blogs", id)).then((res) => {
    array = res.data();
  });

  await getDocs(query(collection(firestore, "blogs"), limit(4))).then((res) => {
    blogs = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: {
      title: array.title,
      tags: array.tags,
      waqt: array.waqt,
      content: array.content,
      id: array.id,
      blogs: blogs,
    },
    revalidate: 10000,
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

export default function Blogs({ title, tags, id, content, waqt, blogs }) {
  return (
    <div className={styles.blog_container}>
      <Metatags title={title} description={content} image={`logo.png`} />
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
          <span>Tags</span>
          <div>
            {tags.map((data) => {
              return <p key={data}>{data}</p>;
            })}
          </div>
        </div>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            borderBottom: "1px solid #eaeaea",
            marginTop: "1rem",
            padding: "1rem",
          }}
        >
          Read More
        </h2>
        <div className={styles.more_container}>
          {blogs.map(({ id, tags, title, waqt, src }) => {
            return (
              <BlogCard
                id={id}
                tags={tags}
                title={title}
                waqt={waqt}
                src={src}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
