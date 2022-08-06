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
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Lesson from "../../../components/popup/lesson";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";

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
    lesson: false,
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
    {
      logo: <ImportContactsIcon />,
      title: "Add a new lesson here",
      button: "Click here to add new lessons",
      open: function (e) {
        dispatch({
          type: "open",
          payload: { name: "lesson", value: state.lesson },
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
          <div className={`${styles.one_create} ${styles.chats_container}`}>
            <ChatIcon />
            <h2>Chat with people here</h2>
            <button type="button" className={styles.create_btn}>
              <Link href="/admin/chats">View chats here</Link>
            </button>
          </div>
          <div className={`${styles.one_create} ${styles.chats_container}`}>
            <LooksOneIcon />
            <h2>Manage Level1s here</h2>
            <button type="button" className={styles.create_btn}>
              <Link href="/admin/level1">
                View level1 requests and users here
              </Link>
            </button>
          </div>
          <div className={`${styles.one_create} ${styles.chats_container}`}>
            <LooksTwoIcon />
            <h2>Manage Level2s here</h2>
            <button type="button" className={styles.create_btn}>
              <Link href="/admin/level2">
                View level2 requests and users here
              </Link>
            </button>
          </div>
          <div className={`${styles.one_create} ${styles.chats_container}`}>
            <Looks3Icon />
            <h2>Manage Level3s here</h2>
            <button type="button" className={styles.create_btn}>
              <Link href="/admin/level3">
                View level3 requests and users here
              </Link>
            </button>
          </div>
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
        {state.lesson && (
          <Popup title="Add a new lesson" name="lesson" dispatch={dispatch}>
            <Lesson />
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
        <div className={styles.footer_container}>
          <Footer />
        </div>
      </div>
    </AdminCheck>
  );
}
