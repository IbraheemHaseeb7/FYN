import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../libraries/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useUsername() {
  const [username, setUsername] = useState(null);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    let unsub;

    if (user) {
      unsub = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsub;
  }, [user]);

  return { username };
}
