import { useContext } from "react";
import { UserContext } from "../../pages/_app";
import styles from "./chat.module.css";

export default function ChatBox({ messages }) {
  const data = useContext(UserContext);

  let index = -1;

  return (
    <div className={styles.main_container}>
      {messages.map(({ message, uid }) => {
        index++;

        return (
          <p
            style={
              data.uid !== uid
                ? {
                    backgroundColor: "#d9d9d9",
                    color: "black",
                    alignSelf: "flex-start",
                  }
                : {
                    backgroundColor: "#ff8e73",
                    color: "white",
                    alignSelf: "flex-end",
                  }
            }
            key={index}
          >
            {message}
          </p>
        );
      })}
    </div>
  );
}
