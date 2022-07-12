import { useContext } from "react";
import { UserContext } from "../../pages/_app";
import styles from "./chat.module.css";

export default function ChatBox({ messages }) {
  const data = useContext(UserContext);

  return (
    <div className={styles.main_container}>
      {messages.map(({ message, uid }) => {
        return (
          <p
            style={
              data.uid !== uid
                ? {
                    backgroundColor: "#ff8e7e",
                    color: "white",
                    alignSelf: "flex-start",
                  }
                : {
                    backgroundColor: "white",
                    border: "1px solid #ff8e7e",
                    color: "black",
                    alignSelf: "flex-end",
                  }
            }
          >
            {message}
          </p>
        );
      })}
    </div>
  );
}
