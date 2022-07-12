import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { auth, firestore } from "../libraries/firebase";

export default function useUser() {
  const [uid, setUid] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState(null);

  function getData(uid) {
    let unsub = onSnapshot(doc(firestore, "users", uid), (doc) => {
      if (doc.data()?.username === "" || doc.data()?.username === undefined) {
        setUsername(null);
      } else {
        setUsername(doc.data().username);
      }
    });

    return unsub;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
      setUid(user.uid);

      getData(user.uid);
    } else {
      setUsername(null);
      setSignedIn(false);
    }
  });

  return { uid, signedIn, username };
}
