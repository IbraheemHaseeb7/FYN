import { useContext, useState } from "react";
import styles from "../../styles/signin.module.css";
import Footer from "../../components/footer/footer";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
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
import useUsername from "../../hooks/username";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SignIn() {
  const [data, setData] = useState({
    username: "",
  });

  const [avail, setAvail] = useState(false);
  const { username, uid, signedIn } = useContext(UserContext);

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  }

  async function signIn() {
    await signInWithPopup(auth, new GoogleAuthProvider());

    if (signedIn) {
      if (username === null) {
        await setDoc(doc(firestore, `/users`, uid), {
          uid: uid,
          username: null,
        });
      }
    }
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
      } else {
        setAvail(false);
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await updateDoc(doc(firestore, `/users`, uid), {
      username: data.username,
    });

    setData({
      username: "",
    });
  }

  return (
    <div className={styles.signin_container}>
      <div className={styles.title_container}>
        <h1>Sign Up for free!</h1>
      </div>
      <div className={styles.form_and_graphics}>
        <div className={styles.graphics_container}>
          <img alt="image was here" src="sign.jpg" className={styles.img} />
        </div>
        <form className={styles.form}>
          {!signedIn ? (
            <button type="button" onClick={signIn} className={styles.google}>
              <GoogleIcon /> Sign In with Google
            </button>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await signOut(auth);
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
                type="button"
                onClick={checkAvailable}
                className={`${styles.signup} ${styles.check}`}
              >
                Check Availablity
              </button>
              <button
                disabled={!avail}
                type="button"
                onClick={handleSubmit}
                className={styles.signup}
              >
                Sign Up
              </button>
            </>
          ) : (
            <h3>Welcome back, {username}</h3>
          )}
          <p className={styles.lil}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ut
            repudiandae nihil itaque, reiciendis, magni necessitatibus
            cupiditate iure, dolorem similique minima? Molestiae eaque autem,
            quam labore architecto hic suscipit quae!
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
