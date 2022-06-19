import { useState } from "react";
import styles from "./popup.module.css";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup({ name, title, dispatch, children }) {
  const [see, setSee] = useState(false);
  const [btnname, setBtnName] = useState("Show");

  function closeIt() {
    dispatch({ type: "close", payload: { name: name, value: false } });
  }

  return (
    <div className={styles.popup_container}>
      <div className={styles.main_announcement_container}>
        <h1>{title}</h1>
        <div className={styles.rules_container}>
          <div className={styles.title_and_btn_container}>
            <h3>Markdown Rules/Typing Rules</h3>
            <button
              type="button"
              className={styles.see_btn}
              onClick={() => {
                if (see === false) {
                  setBtnName("Close");
                } else {
                  setBtnName("Show");
                }
                setSee(!see);
              }}
            >
              {btnname}
            </button>
          </div>
          {see && (
            <div className={styles.markdown_container}>
              <p>
                <b>Name</b>
              </p>
              <span className={styles.span}>
                <b>Syntax</b>
              </span>
              <p>
                <b>Preview</b>
              </p>
              <p>Heading.1</p>
              <span className={styles.span}># Heading</span>
              <p>Heading</p>
              <p>Heading.2</p>
              <span className={styles.span}>## Heading</span>
              <p>Heading</p>
              <p>Heading.3</p>
              <span className={styles.span}>### Heading</span>
              <p>Heading</p>
              <p>Bold</p>
              <span className={styles.span}>**bold text**</span>
              <p>
                <b>bold text</b>
              </p>
              <p>Italics</p>
              <span className={styles.span}>*italics text*</span>
              <p>
                <i>italics text</i>
              </p>
              <p>Blockquote</p>
              <span className={styles.span}>{`>`} Text</span>
              <p>
                <blockquote>Text</blockquote>
              </p>
              <p>Ordered List</p>
              <span className={styles.span}>
                1. First
                <br />
                2. Second <br />
                3. Third
              </span>
              <p>
                1. First
                <br />
                2. Second <br />
                3. Third
              </p>
              <p>Unordered List</p>
              <span className={styles.span}>
                - First
                <br />
                - Second <br />- Third
              </span>
              <p>
                - First
                <br />
                - Second <br />- Third
              </p>
              <p>Code</p>
              <span className={styles.span}>`code`</span>
              <p>
                <code>code</code>
              </p>
              <p>Link</p>
              <span className={styles.span}>
                [title](https://www.youtube.com)
              </span>
              <p>
                <a href="https://www.youtube.com">title</a>
              </p>
              <p>Image</p>
              <span className={styles.span}>![alt text](image.jpeg)</span>
              <p>
                <img src="gen1logo_white_text_transparent.png" />
              </p>
            </div>
          )}
        </div>
        <button
          className={`${styles.see_btn} ${styles.close_btn}`}
          type="button"
          onClick={closeIt}
        >
          <CloseIcon />
        </button>
        <div className={styles.forms_container}>{children}</div>
      </div>
      <div className={styles.blur} onClick={closeIt}></div>
    </div>
  );
}
