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
import VideoCard from "../../components/videoCard/VideoCard";
import Metatags from "../../components/meta/meta";
import SignCheck from "../../protectors/signCheck";
import UsernameCheck from "../../protectors/usernameCheck";
import Levels from "../../protectors/levels";

export async function getStaticProps(data) {
  const id = data.params.lesson;

  let array = [];
  let blogs = [];

  await getDoc(doc(firestore, "lessons", id)).then((res) => {
    array = res.data();
  });

  await getDocs(query(collection(firestore, "lessons"), limit(4))).then(
    (res) => {
      blogs = res.docs.map((data) => {
        return data.data();
      });
    }
  );

  return {
    props: {
      title: array.title,
      tags: array.tags,
      waqt: array.waqt,
      content: array.content,
      id: array.id,
      video: array.video,
      blogs: blogs,
    },
    revalidate: 10000,
  };
}

export async function getStaticPaths() {
  let array = [];

  await getDocs(collection(firestore, "lessons")).then((res) => {
    array = res.docs.map((data) => {
      const { id } = data.data();

      return { params: { ebook: id } };
    });
  });

  return {
    paths: array,
    fallback: "blocking",
  };
}

export default function Blogs({
  title,
  tags,
  id,
  content,
  waqt,
  blogs,
  video,
}) {
  return (
    <SignCheck>
      <UsernameCheck>
        <Levels>
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
              <div className={styles.video_container}>
                <iframe src={video} allow="fullscreen"></iframe>
              </div>
              <div className={styles.content_container}>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
              <div className={styles.tags_container}>
                <span>Tags</span>
                <div>
                  {tags.length === 0 ? (
                    <p>No Tags available</p>
                  ) : (
                    <>
                      {tags.map((data) => {
                        return <p key={data}>{data}</p>;
                      })}
                    </>
                  )}
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
                    <VideoCard
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
        </Levels>
      </UsernameCheck>
    </SignCheck>
  );
}
