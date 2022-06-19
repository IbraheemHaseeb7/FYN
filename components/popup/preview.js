import ReactMarkdown from "react-markdown";
import styles from "./popup.module.css";

export default function Preview({ content }) {
  return (
    <div className={styles.preview_container}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
