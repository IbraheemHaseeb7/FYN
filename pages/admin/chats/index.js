import styles from "../../../styles/chatpage.module.css";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../libraries/firebase";

export async function getStaticProps() {
  let array = [];
  await getDocs(collection(firestore, "chats")).then((res) => {
    array = res.docs.map((data) => {
      return data.data();
    });
  });

  return {
    props: { array },
  };
}

export default function ChatPage({ array }) {
  return (
    <div className={styles.main_container}>
      <div className={styles.go_back_container}>
        <Link href="/admin/create">
          <button type="button">Go Back</button>
        </Link>
      </div>
      <div className={styles.title_container}>
        <h1>Chat with people</h1>
      </div>
      <div className={styles.chats_container}>
        {array.map(({ title, id }) => {
          return (
            <Link href={`/admin/chats/${id}`} key={id}>
              <div className={styles.chats}>
                <h3>{title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
