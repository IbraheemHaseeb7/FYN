import styles from "../../../styles/chatpage.module.css";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../libraries/firebase";
import AdminCheck from "../../../protectors/adminCheck";

export async function getServerSideProps() {
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
    <AdminCheck>
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
          {array.map(({ title, id, read }) => {
            let noti = true;

            for (let counter = 0; counter < read?.length; counter++) {
              if (read[counter]?.uid === "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3") {
                noti = read[counter]?.read;
              }
            }

            return (
              <Link href={`/admin/chats/${id}`} key={id}>
                <div className={styles.chats}>
                  <h3>{title}</h3>
                  {!noti && <div className={styles.noti}>1</div>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminCheck>
  );
}
