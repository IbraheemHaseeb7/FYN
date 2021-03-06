import styles from "../../../styles/blog_create.module.css";
import BookIcon from "@mui/icons-material/Book";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useReducer } from "react";
import Popup from "../../../components/popup/popup";
import Announcement from "../../../components/popup/announcement";
import Forum from "../../../components/popup/forum";
import ChatIcon from "@mui/icons-material/Chat";
import Link from "next/link";
import Footer from "../../../components/footer/footer";
import AdminCheck from "../../../protectors/adminCheck";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Video from "../../../components/popup/video";

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        [action.payload.name]: !action.payload.value,
      };

    case "close":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
  }
}

export default function Create() {
  const [state, dispatch] = useReducer(reducer, {
    blog: false,
    forum: false,
    chats: false,
    video: false,
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
    {
      logo: <OndemandVideoIcon />,
      title: "Add a new video here",
      button: "Click here to add new video and text",
      open: function (e) {
        dispatch({
          type: "open",
          payload: { name: "video", value: state.video },
        });
      },
    },
  ];

  return (
    <AdminCheck>
      <div className={styles.create_container}>
        <div className={styles.topic_container}>
          <h1>Welcome, Please choose your option from below</h1>
        </div>
        <div className={styles.creaters}>
          {creater.map(({ logo, title, button, open, value }) => {
            return (
              <div className={styles.one_create} key={title}>
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
        {state.blog && (
          <Popup title="Create a new Blog" name="blog" dispatch={dispatch}>
            <Announcement />
          </Popup>
        )}
        {state.video && (
          <Popup title="Add a new video" name="video" dispatch={dispatch}>
            <Video />
          </Popup>
        )}
        {state.forum && (
          <Popup
            title="Create a new Forum Question"
            name="forum"
            dispatch={dispatch}
          >
            <Forum />
          </Popup>
        )}
        <div className={`${styles.one_create} ${styles.chats_container}`}>
          <ChatIcon />
          <h2>Chat with people here</h2>
          <button type="button" className={styles.create_btn}>
            <Link href="/admin/chats">View chats here</Link>
          </button>
        </div>
        <div className={styles.footer_container}>
          <Footer />
        </div>
      </div>
    </AdminCheck>
  );
}
