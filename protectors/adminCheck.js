import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../libraries/firebase";

export default function AdminCheck({ children }) {
  const [user] = useAuthState(auth);

  return (
    <>
      {user?.uid === "R3tc0RKCDgX8yhaHS5c0Ej3IXxF3" ? (
        children
      ) : (
        <h3 style={{ marginTop: "6rem" }}>
          You are not allowed to view this page
        </h3>
      )}
    </>
  );
}
