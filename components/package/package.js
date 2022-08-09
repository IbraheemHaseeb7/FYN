import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { firestore } from "../../libraries/firebase";
import styles from "./package.module.css";
import { UserContext } from "../../pages/_app";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";

export default function Package({
  title,
  points,
  price,
  button,
  level,
  applied,
}) {
  const { username, uid, room } = useContext(UserContext);

  async function putRequest(e) {
    e.preventDefault();

    if (applied) {
      toast("You have already applied for this level", {
        icon: "ℹ",
      });
    } else {
      const id = new Date().getTime().toString();

      const roomId = await createRoom();

      if (username !== null) {
        if (room !== "") {
          await setDoc(doc(firestore, level, id), {
            uid: uid,
            username: username,
            allowed: false,
            id: id,
            room: room,
          });
        } else {
          await setDoc(doc(firestore, level, id), {
            uid: uid,
            username: username,
            allowed: false,
            id: id,
            room: roomId,
          });
        }

        toast.success(`Your request for ${level} have been submitted!`);
      } else {
        toast.error("Please make an account first to put in request");
      }
    }
  }

  async function createRoom() {
    let id = new Date().getTime().toString();

    if (room == "") {
      await setDoc(doc(firestore, `chats`, id), {
        uid: [uid, "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3"],
        title: username,
        id: id,
        read: [
          { uid: uid, read: true },
          { uid: "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3", read: true },
        ],
      });
    }
    return id;
  }

  return (
    <div className={styles.main_container}>
      <h1>{title}</h1>
      <h3 className={styles.unlocks}>Unlocks</h3>
      <ul>
        {points.map((data) => {
          return <li>{data}</li>;
        })}
      </ul>
      <h3 className={styles.price}>
        Unlock for <span>${price}</span>
      </h3>
      <button className={styles.apply} type="button" onClick={putRequest}>
        {button}
      </button>
    </div>
  );
}
