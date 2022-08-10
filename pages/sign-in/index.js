import { useContext, useState, useMemo } from "react";
import styles from "../../styles/signin.module.css";
import Footer from "../../components/footer/footer";
import GoogleIcon from "@mui/icons-material/Google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, firestore } from "../../libraries/firebase";
import { UserContext } from "../_app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import Metatags from "../../components/meta/meta";
import Loader from "../../components/loader/loader";

export default function SignIn() {
  const [data, setData] = useState({
    username: "",
  });
  const [avail, setAvail] = useState(true);
  const [signAvail, setSignAvail] = useState(true);
  const { uid, signedIn, username, username_set, load } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    setAvail(false);
    setSignAvail(true);

    setData({
      ...data,
      [name]: value,
    });
  }
  async function signIn() {
    setLoading(true);

    await signInWithPopup(auth, new GoogleAuthProvider());

    let usernameCheck;
    const id = new Date().getTime().toString();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getDoc(doc(firestore, `/users`, user?.uid)).then((res) => {
          usernameCheck = res?.data()?.username_set;
        });

        if (usernameCheck === undefined) {
          setDoc(doc(firestore, `users`, user.uid), {
            uid: user.uid,
            username: null,
            username_set: false,
            level1: false,
            level2: false,
            level3: false,
            level1id: "",
            level2id: "",
            level3id: "",
            ebook: false,
            id: id,
          });
        }
      }
    });
    setSignAvail(true);
  }

  async function checkAvailable() {
    await getDocs(
      query(
        collection(firestore, "users"),
        where("username", "==", data.username)
      )
    ).then((res) => {
      let array = res.docs.map((data) => {
        return data.data();
      });
      if (array.length === 0) {
        setAvail(true);
        setSignAvail(false);
        toast.success("Username available for use");
      } else {
        toast.error("Username is not available");
        setSignAvail(true);
        setAvail(true);
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await updateDoc(doc(firestore, `/users`, uid), {
      username: data.username,
      username_set: true,
    });

    toast.success("Username set successfully");

    setData({
      username: "",
    });
  }

  const some = useMemo(() => {
    setLoading(false);
    return false;
  }, [signedIn]);

  return (
    <div className={styles.signin_container}>
      <Metatags
        title={`Sign In`}
        description={`Sign in to our page and be a part of a wonderful community.`}
        image={`logo.png`}
      />
      <div className={styles.title_container}>
        <h1>Sign Up for free!</h1>
      </div>
      <div className={styles.form_and_graphics}>
        <div className={styles.graphics_container}>
          <img alt="image was here" src="sign.jpg" className={styles.img} />
        </div>
        <form className={styles.form}>
          {loading ? (
            <Loader />
          ) : !signedIn ? (
            <button type="button" onClick={signIn} className={styles.google}>
              <GoogleIcon /> Sign In with Google
            </button>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await signOut(auth);
                setAvail(true);
                setSignAvail(true);
              }}
              className={styles.google}
            >
              <GoogleIcon /> Sign Out from Google
            </button>
          )}
          {username === null ? (
            <>
              <input
                disabled={!signedIn}
                name="username"
                type="name"
                value={data.username}
                className={styles.input}
                onChange={handleChange}
                placeholder="Username"
              />
              <button
                disabled={avail}
                type="button"
                onClick={checkAvailable}
                className={`${styles.signup} ${styles.check}`}
              >
                Check Availablity
              </button>

              <button
                disabled={signAvail}
                type="button"
                onClick={handleSubmit}
                className={styles.signup}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h3>Welcome back, {username}</h3>
              <p className={styles.lil}>
                You can now comment on the forum pages. With signing in you have
                unlocked the features to chat annonymously with the admin and
                share your problems without in hesitation. Do not worry your
                identity can not be exposed.
              </p>
            </>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
