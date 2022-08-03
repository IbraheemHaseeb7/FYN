import styles from "./portalbar.module.css";
import Link from "next/link";

export default function PortalBar() {
  const option = [
    { name: "Home", address: "/" },
    { name: "Blogs", address: "/blogs" },
    { name: "Videos", address: "/videos" },
    { name: "Public Forum", address: "/forums" },
    { name: "Private Forum", address: "/priv-forums" },
    { name: "Lessons", address: "/lessons" },
  ];

  return (
    <div className={styles.main_container}>
      <div className={styles.options_container}>
        {option.map(({ name, address }) => {
          return (
            <Link href={address}>
              <button className={styles.option} type="button">
                {name}
              </button>
            </Link>
          );
        })}
        <button type="button" className={styles.option}>
          Post new Question
        </button>
      </div>
    </div>
  );
}
