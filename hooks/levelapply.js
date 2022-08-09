import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../libraries/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function useLevelApply() {
  const router = useRouter();

  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // for level 1
        onSnapshot(
          query(collection(firestore, "level1"), where("uid", "==", user.uid)),
          (res) => {
            let array = res.docs.map((res) => {
              return res.data();
            });

            if (array.length === 0) {
              setLevel1(false);
            } else {
              setLevel1(true);
            }
          }
        );
        // for level 2
        onSnapshot(
          query(collection(firestore, "level2"), where("uid", "==", user.uid)),
          (res) => {
            let array = res.docs.map((res) => {
              return res.data();
            });

            if (array.length === 0) {
              setLevel2(false);
            } else {
              setLevel2(true);
            }
          }
        );
        // for level 3
        onSnapshot(
          query(collection(firestore, "level3"), where("uid", "==", user.uid)),
          (res) => {
            let array = res.docs.map((res) => {
              return res.data();
            });

            if (array.length === 0) {
              setLevel3(false);
            } else {
              setLevel3(true);
            }
          }
        );
      }
    });
  }, [router.query]);

  return { level1, level2, level3 };
}
