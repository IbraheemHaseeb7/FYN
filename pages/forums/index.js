import styles from "../../styles/forums.module.css";

const forums = [{ date: "", content: "" }];

export default function Forums() {
  return (
    <div className={styles.forums_container}>
      <div className={styles.title_container}>
        <h1>Get in touch with a Wonderful Community</h1>
      </div>
      <div className={styles.forums}>
        {forums.map(({ date, content }) => {
          return <div className={styles.forum}></div>;
        })}
      </div>
    </div>
  );
}
