import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../libraries/firebase";

export default function useUser() {
  const [uid, setUid] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [username_set, setUsername_set] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    let unsub;

    if (user) {
      unsub = onSnapshot(doc(firestore, `users`, user.uid), (data) => {
        setUsername(data.data()?.username);
        setUsername_set(data.data()?.username_set);
        setUid(user.uid);
        setSignedIn(true);
      });
    } else {
      setUsername(null);
      setUsername_set(false);
      setSignedIn(false);
      setUid("");
    }

    return unsub;
  }, [user]);

  return { uid, signedIn, username, username_set };
}
