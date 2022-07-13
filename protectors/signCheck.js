import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../libraries/firebase";

export default function SignCheck({ children }) {
  const [user] = useAuthState(auth);

  return (
    <>
      {user?.uid !== undefined ? (
        children
      ) : (
        <h3 style={{ marginTop: "6rem" }}>
          You are not signed in to comment/chat
        </h3>
      )}
    </>
  );
}
