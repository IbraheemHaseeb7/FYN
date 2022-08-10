import { auth, firestore } from "../libraries/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function useLevel() {
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [ebook, setEBook] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await getDoc(doc(firestore, `users`, user?.uid)).then((res) => {
        setLevel1(res.data()?.level1);
        setLevel2(res.data()?.level2);
        setLevel3(res.data()?.level3);
        setEBook(res.data()?.ebook);
      });
    }
  });

  return {
    level1,
    level2,
    level3,
    ebook,
  };
}
