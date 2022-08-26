import { useRef } from "react";
import styles from "./manage.module.css";

export default function ManageBar({ setActive }) {
  const btns = [
    { name: "videos", id: 1 },
    { name: "blogs", id: 2 },
    { name: "lessons", id: 3 },
    { name: "forum", id: 4 },
  ];

  function handleClick(e) {
    e.preventDefault();
    colorize(e);
    e.target.setAttribute("style", "background-color: #d9d9d9;");
    setActive(e.target.value);
  }

  function colorize(e) {
    for (
      let counter = 0;
      counter < e.target.parentElement.childNodes.length;
      counter++
    ) {
      e.target.parentElement.childNodes[counter].setAttribute(
        "style",
        "background-color: #eaeaea"
      );
    }
  }

  return (
    <div className={styles.main_container}>
      {btns.map(({ name, id }) => {
        return (
          <button
            type="button"
            className={styles.btn}
            value={name}
            key={id}
            onClick={handleClick}
            name={name}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
