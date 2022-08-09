import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../libraries/firebase";
import { UserContext } from "../pages/_app";

export default function useChat() {
  const [room, setRoom] = useState("");
  const [notification, setNotification] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let unsub;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        unsub = onSnapshot(
          query(
            collection(firestore, `chats`),
            where("uid", "array-contains", user.uid)
          ),
          (data) => {
            let array = data.docs.map((res) => {
              return res.data();
            });

            if (array.length === 0) {
              setRoom("");
            } else {
              setRoom(array[0].id);
              for (let counter = 0; counter < array[0].read.length; counter++) {
                if (user.uid === array[0].read[counter].uid) {
                  setNotification(array[0].read[counter].read);
                }
              }
            }
          }
        );
      }
    });

    return unsub;
  }, [router.query]);

  return { room, notification };
}
