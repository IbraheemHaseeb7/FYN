import styles from "./package.module.css";

export default function Package({ title, points, price, button }) {
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
      <button className={styles.apply} type="button">
        {button}
      </button>
    </div>
  );
}
