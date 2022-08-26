import { useEffect, useState } from "react";
import styles from "./table.module.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import toast from "react-hot-toast";

export default function Table({ active }) {
  const [data, setData] = useState([{ title: "", id: "" }]);

  useEffect(() => {
    getDocs(query(collection(firestore, active), limit(10))).then((res) => {
      const array = res.docs.map((res) => {
        return res.data();
      });
      setData(array);
    });
  }, [active]);

  async function deleteData(e) {
    e.preventDefault();
    await deleteDoc(doc(firestore, `/${active}`, e.target.value));
    toast.success("Successfully deleted");
  }

  return (
    <div className={styles.main_container}>
      {data.map(({ title, id, question }) => {
        return (
          <div>
            <p className={styles.p}>{title}</p>
            <p className={styles.p}>{question}</p>
            <button type="button" onClick={deleteData} value={id}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
