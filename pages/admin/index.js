import styles from "../../styles/admin.module.css";
import { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../libraries/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

export default function Admin() {
  const [sign, setSign] = useState(false);

  async function SignIn() {
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        setSign(true);
      })
      .catch(() => {
        setSign(false);
      });
  }

  async function SignOut() {
    await signOut(auth)
      .then(() => {
        setSign(false);
      })
      .catch(() => {
        setSign(true);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSign(true);
      } else {
        setSign(false);
      }
    });
  }, []);

  return (
    <div className={styles.admin_container}>
      {sign ? (
        <div className={styles.sign_out_container}>
          <h2>Sign out from Google</h2>
          <button className={styles.signBtn} onClick={SignOut}>
            Sign Out
          </button>
          <Link href="/admin/create">
            <button className={styles.signBtn}>Go to Portal</button>
          </Link>
        </div>
      ) : (
        <div className={styles.sign_in_container}>
          <h2>Sign In Using Google</h2>
          <button className={styles.signBtn} onClick={SignIn}>
            <GoogleIcon />
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}
