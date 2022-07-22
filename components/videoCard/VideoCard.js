import Link from "next/link";
import styles from "./VideoCard.module.css";

export default function BlogCard({ src, id, waqt, tags, title }) {
  return (
    <Link href={`/videos/${id}`}>
      <div className={styles.main_container}>
        <div className={styles.image_container}>
          <img src={src} alt="image" />
        </div>
        <div className={styles.title_container}>
          <h3>{title}</h3>
        </div>
        <div className={styles.tags_container}>
          {tags.map((data) => {
            return <p className={styles.tag}>{data}</p>;
          })}
          <p className={styles.date}>{waqt}</p>
        </div>
      </div>
    </Link>
  );
}
