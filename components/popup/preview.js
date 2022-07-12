import ReactMarkdown from "react-markdown";
import styles from "./popup.module.css";

export default function Preview({ content, title }) {
  return (
    <div className={styles.preview_container}>
      <h1>{title}</h1>
      <div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
