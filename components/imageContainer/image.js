import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { firestore, storage } from "../../libraries/firebase";
import { UserContext } from "../../pages/_app";
import styles from "./image.module.css";
import { paramCase } from "param-case";

export default function Image({ setOpen, open }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const { uid } = useContext(UserContext);
  const myUid = uid;
  const [pop, setPop] = useState(false);
  const [imgLink, setImgLink] = useState("");

  useEffect(() => {
    let unsub = onSnapshot(
      query(
        collection(firestore, `chats/${router.query?.rooms}/images`),
        orderBy("id", "desc")
      ),
      (data) => {
        let array = data.docs.map((data) => {
          return data.data();
        });

        setData(array);
      }
    );

    return unsub;
  }, [router.query]);

  function openPopup(e, src) {
    e.preventDefault();

    setPop(!pop);
    setImgLink(src);
  }

  return (
    <div className={styles.main_container}>
      <button
        className={styles.close}
        type="button"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Close
      </button>
      <div className={styles.inside_container}>
        <h1>Send and View Images here</h1>
        <h1 className={styles.your}>Your Images</h1>
        <div className={styles.your_container}>
          <div className={styles.images_container}>
            {data.map(({ src, uid, id }) => {
              return (
                <div
                  className={styles.image}
                  key={id}
                  onClick={(e) => {
                    openPopup(e, src);
                  }}
                >
                  {myUid === uid && <img src={src} alt="image not found" />}
                </div>
              );
            })}
          </div>
        </div>
        <h1 className={styles.your}>Their Images</h1>
        <div className={styles.other_container}>
          <div className={styles.images_container}>
            {data.map(({ src, uid, id }) => {
              return (
                <div
                  className={styles.image}
                  key={id}
                  onClick={(e) => {
                    openPopup(e, src);
                  }}
                >
                  {myUid !== uid && <img src={src} alt="image not found" />}
                </div>
              );
            })}
          </div>
        </div>
        <UploadImage />
      </div>
      <div
        className={styles.shadow}
        onClick={() => {
          setOpen(!open);
        }}
      ></div>
      {pop && <Popup img={imgLink} pop={pop} setPop={setPop} />}
    </div>
  );
}

function UploadImage() {
  const [img, setImg] = useState("");
  const [file, setFile] = useState("");
  const router = useRouter();
  const { uid } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function handleImage(e) {
    e.preventDefault();

    if (e.target.files.length > 0) {
      let src = URL.createObjectURL(e.target.files[0]);
      setImg(src);
      setFile(e.target.files[0]);
    }
  }

  async function sendImage(e) {
    e.preventDefault();

    setLoading(true);

    const id = new Date().getTime().toString();
    const picName = paramCase(`${file.name}${id}`);

    await uploadBytesResumable(
      ref(storage, `/chats/${router.query?.rooms}/${picName}`),
      file
    );

    let link;

    await getDownloadURL(
      ref(storage, `/chats/${router.query?.rooms}/${picName}`)
    ).then((res) => {
      link = res;
    });

    await setDoc(doc(firestore, `chats/${router.query?.rooms}/images`, id), {
      uid: uid,
      src: link,
      id: id,
    });

    toast.success("Image Uploaded");
    setLoading(false);

    setImg("");
  }

  return (
    <form className={styles.form}>
      <input disabled={loading} onChange={handleImage} type="file" />
      <img className={styles.image_preview} src={img} alt="No Image here" />
      <button
        disabled={loading}
        className={styles.send}
        type="button"
        onClick={sendImage}
      >
        Send
      </button>
      {loading && <p>Uploading...</p>}
    </form>
  );
}

function Popup({ img, pop, setPop }) {
  return (
    <div
      className={styles.popup}
      onClick={() => {
        setPop(!pop);
      }}
    >
      <div></div>
      <img src={img} alt="No Image Found" />
    </div>
  );
}
