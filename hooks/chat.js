import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { auth, firestore } from "../libraries/firebase";

export default function useChat() {
  const [room, setRoom] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getDocs(
          query(
            collection(firestore, `chats`),
            where("uid", "array-contains", user.uid)
          )
        ).then((res) => {
          let array = res.docs.map((res) => {
            return res.data();
          });

          if (array.length === 0) {
            setRoom("");
          } else {
            setRoom(array[0].id);
          }
        });
      }
    });
  }, [router.query]);

  return room;
}
