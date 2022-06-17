import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.video_container}>
        <h1>Start a new Journey on the right path today</h1>
        <iframe src="https://www.youtube.com/embed/mx1V0f9YLrE?autoplay=1&mute=1&loop=1"></iframe>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde eum,
          esse molestias pariatur cupiditate laborum iure tenetur dignissimos
          dolorum reprehenderit harum aspernatur? Commodi, blanditiis fuga
          libero velit dolorum quaerat possimus voluptatibus facilis ab ipsum.
          Eveniet nam asperiores optio! Sit perspiciatis magnam eos et earum
          architecto nemo cupiditate quia, ea hic?
        </p>
        <Link href="/">
          <button type="button" className={styles.join_program}>
            Join The Program
          </button>
        </Link>
      </div>
      <div className={styles.believe_container}>
        <div className={styles.you_container}>
          <h2 className={styles.believe_heading}>Does this describe you?</h2>
          <p className={styles.believe_text}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
            sint dolore voluptatum porro consequuntur maiores ea possimus culpa
            architecto inventore exercitationem quo beatae quam distinctio
            pariatur magnam facere molestias vero? Dicta, excepturi sint velit
            voluptatum et quis a? Saepe natus aut recusandae eum animi nemo
            commodi rem. Voluptatum minima possimus omnis rem adipisci
            reiciendis itaque vero fugit aperiam, obcaecati debitis laboriosam
            incidunt labore dolor dolorum. Inventore at officiis maiores
            perspiciatis?
          </p>
          <Link href="/">
            <button className={styles.help_btn}>I want help</button>
          </Link>
        </div>
        <div className={styles.help_container}>
          <h2 className={styles.believe_heading}>we are here to help</h2>
          <p className={styles.believe_text}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias,
            sint dolore voluptatum porro consequuntur maiores ea possimus culpa
            architecto inventore exercitationem quo beatae quam distinctio
            pariatur magnam facere molestias vero? Dicta, excepturi sint velit
            voluptatum et quis a? Saepe natus aut recusandae eum animi nemo
            commodi rem. Voluptatum minima possimus omnis rem adipisci
            reiciendis itaque vero fugit aperiam, obcaecati debitis laboriosam
            incidunt labore dolor dolorum. Inventore at officiis maiores
            perspiciatis?
          </p>
          <Link href="/">
            <button className={styles.help_btn}>I want help</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
