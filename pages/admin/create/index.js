import styles from "../../../styles/blog_create.module.css";
import BookIcon from "@mui/icons-material/Book";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        [action.payload.name]: !action.payload.value,
      };
  }
}

export default function Create() {
  const [state, dispatch] = useReducer(reducer, {
    blog: false,
    forum: false,
  });

  const creater = [
    {
      logo: <BookIcon />,
      title: "Create a new Blog here",
      button: "Click here to create new Blog",
      open: function (e) {
        dispatch({
          type: "open",
          payload: { name: "blog", value: state.blog },
        });
      },
    },
    {
      logo: <QuestionAnswerIcon />,
      title: "Create a new Forum Question here",
      button: "Click here to create new question",
      open: function (e) {
        dispatch({
          type: "open",
          payload: { name: "forum", value: state.forum },
        });
      },
    },
  ];

  return (
    <div className={styles.create_container}>
      <div className={styles.topic_container}>
        <h1>Welcome, Please choose your option from below</h1>
      </div>
      <div className={styles.creaters}>
        {creater.map(({ logo, title, button, open, value }) => {
          return (
            <div className={styles.one_create}>
              {logo}
              <h2>{title}</h2>
              <button
                type="button"
                className={styles.create_btn}
                onClick={open}
              >
                {button}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
