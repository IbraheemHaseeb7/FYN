import styles from "./transition.module.css";

export default function Transition({ right }) {
  return (
    <>
      {right ? (
        <div className={styles.right}>
          <img src="trans.png" alt="No image here" />
        </div>
      ) : (
        <div className={styles.full}>
          <img src="trans.png" alt="No image here" />
        </div>
      )}
    </>
  );
}
