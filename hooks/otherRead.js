import { doc, onSnapshot, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { firestore } from "../libraries/firebase";
import { UserContext } from "../pages/_app";

export default function useOtherRead() {
  const [read, setRead] = useState(true);
  const router = useRouter();
  const { uid } = useContext(UserContext);

  useEffect(() => {
    let unsub = onSnapshot(
      doc(firestore, `chats`, router.query?.rooms),
      (data) => {
        for (let counter = 0; counter < data.data()?.read.length; counter++) {
          if (data.data()?.read[0].uid !== uid) {
            setRead(data.data()?.read[0].read);
          } else {
            setRead(data.data()?.read[1].read);
          }
        }
      }
    );

    return unsub;
  }, [router.query?.rooms]);

  return read;
}
