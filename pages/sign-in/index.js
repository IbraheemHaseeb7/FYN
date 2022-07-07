import { useState } from "react";
import styles from "../../styles/signin.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Footer from "../../components/footer/footer";
import Link from "next/link";

export default function SignIn() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [view, setView] = useState("password");

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  }

  function changeView() {
    if (view === "password") {
      setView("name");
    } else {
      setView("password");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setData({
      username: "",
      password: "",
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
          <input
            name="username"
            type="name"
            value={data.username}
            className={styles.input}
            onChange={handleChange}
            placeholder="Username"
          />
          <div className={styles.pass_div}>
            <input
              name="password"
              type={view}
              value={data.password}
              className={`${styles.input} ${styles.pass}`}
              onChange={handleChange}
              placeholder="Password"
            />
            <span className={styles.label} onClick={changeView}>
              <VisibilityIcon />
            </span>
          </div>
          <Link href="/login">
            <p className={styles.login}>Already have an account? Login here</p>
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.signup}
          >
            Sign Up
          </button>
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
