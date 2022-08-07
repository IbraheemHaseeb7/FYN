import { useState } from "react";
import Preview from "./preview";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import styles from "./popup.module.css";
import { toast } from "react-hot-toast";
import { paramCase } from "param-case";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../libraries/firebase";

export default function Video() {
  const [value, setValue] = useState({
    content: "",
    title: "",
    tags: [],
    tag: "",
    src: "",
    video: "",
    file: "",
    fileLink: "Upload a new image to get Link",
    level1: false,
    level2: false,
    level3: false,
    public: false,
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

    if (
      value.src &&
      value.title &&
      value.video &&
      (value.level1 || value.level2 || value.level3 || value.public)
    ) {
      await setDoc(doc(firestore, `/videos`, id), {
        id: id,
        content: value.content,
        title: value.title,
        tags: value.tags,
        waqt: waqt,
        src: value.src,
        video: value.video,
        level1: value.level1,
        level2: value.level2,
        level3: value.level3,
        public: value.public,
      });

      toast.success("Video Successfully added");

      setValue({
        content: "",
        title: "",
        tags: [],
        tag: "",
        src: "",
        video: "",
        file: "",
        fileLink: "Upload a new image to get Link",
        level1: false,
        level2: false,
        level3: false,
        public: false,
      });
    } else {
      toast.error("Please fill out all the fields");
    }
  }

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

  function handleFile(e) {
    e.preventDefault();

    setValue({ ...value, file: e.target.files[0] });
  }

  async function uploadFile(e) {
    e.preventDefault();

    toast.success("File is uploading");

    const id = new Date().getTime().toString();
    let name = paramCase(value.title);
    let picName = paramCase(value.file.name);

    await uploadBytesResumable(ref(storage, `${name}/${picName}`), value.file);

    toast.success("New Image Uploaded Successfully");

    await getDownloadURL(ref(storage, `${name}/${picName}`)).then((res) => {
      setValue({ ...value, fileLink: res });
    });
  }

  function copyText(e) {
    e.preventDefault();

    navigator.clipboard.writeText(value.fileLink);

    toast.success("Link Copied Successfully");
  }

  function reset(e) {
    e.preventDefault();

    setValue({ ...value, file: "", fileLink: "Upload to get a file link..." });
  }

  function handleLevels(e) {
    let val = e.target.value;
    let title = e.target.title;

    let result = val === "true";

    setValue({
      ...value,
      [title]: !result,
    });
  }

  console.log(value);

  let id = -1;

  return (
    <form className={styles.announcement_container}>
      <h1>Start writing from here</h1>
      <input
        className={styles.input}
        name="video"
        value={value.video}
        placeholder="Enter your video link here"
        onChange={handleChange}
      />
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
      <input
        className={styles.input}
        placeholder="Image link goes here..."
        type="url"
        name="src"
        value={value.src}
        onChange={handleChange}
      />
      <div className={styles.file_uploader}>
        <input type="file" className={styles.input} onChange={handleFile} />
        <button className={styles.submitBtn} onClick={reset}>
          Reset
        </button>
        <button className={styles.submitBtn} type="button" onClick={uploadFile}>
          Upload
        </button>
        <div>
          <p>{value.fileLink}</p>
          <button className={styles.submitBtn} onClick={copyText}>
            Copy Link
          </button>
        </div>
      </div>
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
        id++;

        return (
          <div className={styles.tags_container} key={id}>
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
      <div className={styles.levels_container}>
        <div>
          <input
            className={styles.level_input}
            type="checkbox"
            name="level"
            data-toggle="tooltip"
            title="level1"
            value={value.level1}
            onClick={handleLevels}
            id="level1"
          />
          <label htmlFor="level1">Level 1</label>
        </div>
        <div>
          <input
            className={styles.level_input}
            type="checkbox"
            name="level"
            data-toggle="tooltip"
            title="level2"
            value={value.level2}
            onClick={handleLevels}
            id="level2"
          />
          <label htmlFor="level2">Level 2</label>
        </div>
        <div>
          <input
            className={styles.level_input}
            type="checkbox"
            name="level"
            title="level3"
            data-toggle="tooltip"
            value={value.level3}
            onClick={handleLevels}
            id="level3"
          />
          <label htmlFor="level3">Level 3</label>
        </div>
        <div>
          <input
            className={styles.level_input}
            type="checkbox"
            name="level"
            title="public"
            data-toggle="tooltip"
            value={value.public}
            onClick={handleLevels}
            id="public"
          />
          <label htmlFor="public">Public</label>
        </div>
      </div>
      <h1>{value.title}</h1>
      <div className={styles.video_container}>
        <iframe src={value.video}></iframe>
      </div>
      <Preview content={value.content} />
      <button className={styles.submitBtn} type="button" onClick={handleSubmit}>
        SUBMIT
      </button>
    </form>
  );
}
