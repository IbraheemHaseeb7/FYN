import { useState } from "react";
import Preview from "./preview";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import styles from "./popup.module.css";

export default function Announcement() {
  const [value, setValue] = useState({
    content: "",
    title: "",
    tags: [],
    tag: "",
  });

  function handleChange(e) {
    let values = e.target.value;
    let name = e.target.name;

    setValue({ ...value, [name]: values });
  }

  const date = new Date().toString();
  const month = date.substring(4, 7);
  const day = date.substring(8, 10);
  const year = date.substring(11, 15);

  const waqt = day + " " + month + ", " + year;

  async function handleSubmit(e) {
    e.preventDefault();

    const id = new Date().getTime().toString();

    await setDoc(doc(firestore, `/blogs`, id), {
      id: id,
      content: value.content,
      title: value.title,
      tags: value.tags,
      waqt: waqt,
    });

    setValue({
      content: "",
      title: "",
      tags: [],
      tag: "",
    });
  }

  console.log(value.tags);

  function handleTags() {
    setValue({ ...value, tags: [...value.tags, value.tag], tag: "" });
  }

  function handleTagDel(e) {
    let array = value.tags;

    let array2 = array.filter((data) => {
      return data !== e.target.value;
    });

    setValue({ ...value, tags: array2 });
  }

  return (
    <form className={styles.announcement_container}>
      <h1>Start writing from here</h1>
      <input
        className={styles.input}
        name="title"
        value={value.title}
        placeholder="Enter your title here"
        onChange={handleChange}
      />
      <textarea
        placeholder="Type your blog here..."
        className={styles.textarea_announcement}
        value={value.content}
        name={`content`}
        onChange={handleChange}
      ></textarea>
      <div>
        <input
          className={styles.input}
          name="tag"
          value={value.tag}
          onChange={handleChange}
          placeholder="Type one tag"
          disabled={value.tags.length === 5}
        />
        <button className={styles.submitBtn} type="button" onClick={handleTags}>
          Add Tag
        </button>
      </div>
      {value.tags.map((tag) => {
        return (
          <div className={styles.tags_container}>
            <p>{tag}</p>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleTagDel}
              value={tag}
            >
              Delete
            </button>
          </div>
        );
      })}
      <Preview content={value.content} title={value.title} />
      <button className={styles.submitBtn} type="button" onClick={handleSubmit}>
        SUBMIT
      </button>
    </form>
  );
}
