import styles from "../../../styles/level1manage.module.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../../libraries/firebase";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Level1() {
  const LIMIT = 20;

  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [userCursor, setUserCursor] = useState("");
  const [lastUser, setLastUser] = useState(false);
  const [requests, setRequests] = useState([]);
  const [requestsCursor, setRequestsCursor] = useState("");
  const [lastRequest, setLastRequest] = useState(false);

  async function accept(e, uid, id) {
    e.preventDefault();

    const lid = new Date().getTime().toString();

    await updateDoc(doc(firestore, `users`, uid), {
      level1: true,
      level2: true,
      level3: true,
      ebook: true,
      level3id: lid,
    });

    await deleteDoc(doc(firestore, `level3`, id));

    toast.success("User is now level 3");
  }
  async function remove(e, uid) {
    e.preventDefault();

    await updateDoc(doc(firestore, `users`, uid), {
      level1: false,
      level2: false,
      level3: false,
      ebook: false,
      level3id: "",
    });

    toast.success("user has been removed from level 3");
  }
  async function deleteIt(e, id) {
    e.preventDefault();

    await deleteDoc(doc(firestore, `level3`, id));

    toast.success("User request has been rejected");
  }

  // users

  useEffect(() => {
    let unsub = onSnapshot(
      query(
        collection(firestore, "users"),
        where("level3", "==", true),
        orderBy("level3id", "desc"),
        limit(LIMIT)
      ),
      (data) => {
        let array = data.docs.map((data) => {
          return data.data();
        });
        setUsers(array);
        setUserCursor(array[array.length - 1]?.level3id);

        if (array.length > LIMIT - 1) {
          setLastUser(false);
        } else {
          setLastUser(true);
        }
      }
    );

    return unsub;
  }, [router.query]);

  async function loadMoreUsers(e) {
    e.preventDefault();

    await getDocs(
      query(
        collection(firestore, `users`),
        where("level3", "==", true),
        limit(LIMIT),
        orderBy("level3id", "desc"),
        startAfter(userCursor)
      )
    ).then((res) => {
      let prevArray = users;
      let array = res.docs.map((res) => {
        prevArray.push(res.data());
      });

      setUserCursor(prevArray[prevArray.length - 1]?.level3id);

      if (array.length > LIMIT - 1) {
        setLastUser(false);
      } else {
        setLastUser(true);
      }
    });
  }

  // requests

  useEffect(() => {
    let unsub = onSnapshot(
      query(
        collection(firestore, "level3"),
        orderBy("id", "desc"),
        limit(LIMIT)
      ),
      (data) => {
        let array = data.docs.map((data) => {
          return data.data();
        });

        setRequests(array);
        setRequestsCursor(array[array.length - 1]?.id);

        if (array.length > LIMIT - 1) {
          setLastRequest(false);
        } else {
          setLastRequest(true);
        }
      }
    );

    return unsub;
  }, [router.query]);

  async function loadMoreRequests(e) {
    e.preventDefault();

    await getDocs(
      query(
        collection(firestore, `level3`),
        limit(LIMIT),
        orderBy("level3id", "desc"),
        startAfter(requestsCursor)
      )
    ).then((res) => {
      let prevArray = requests;
      let array = res.docs.map((res) => {
        prevArray.push(res.data());
      });

      setUserCursor(prevArray[prevArray.length - 1].id);

      if (array.length > LIMIT - 1) {
        setLastRequest(false);
      } else {
        setLastRequest(true);
      }
    });
  }

  return (
    <div className={styles.main_container}>
      <h1>Manage Level 3 here</h1>
      <div className={styles.requests_container}>
        <h2>Requests</h2>
        <div>
          {requests.map(({ username, id, uid, room }) => {
            return (
              <div className={styles.requests} key={id}>
                <h3>{username}</h3>
                <div>
                  <Link href={`/admin/chats/${room}`}>
                    <button type="button" className={styles.accept}>
                      Chat
                    </button>
                  </Link>
                  <button
                    type="button"
                    className={styles.accept}
                    onClick={(e) => {
                      accept(e, uid, id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className={styles.accept}
                    onClick={(e) => {
                      deleteIt(e, id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {!lastRequest && (
            <button
              className={styles.accept}
              type="button"
              onClick={loadMoreRequests}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <div className={styles.requests_container}>
        <h2>Users</h2>
        <div>
          {users.map(({ username, uid }) => {
            return (
              <div className={styles.requests}>
                <h3>{username}</h3>
                <div>
                  <button
                    type="button"
                    className={styles.accept}
                    onClick={(e) => {
                      remove(e, uid);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          {!lastUser && (
            <button
              className={styles.accept}
              type="button"
              onClick={loadMoreUsers}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
