import useUser from "../hooks/user";
import { auth } from "../libraries/firebase";

export default function UsernameCheck({ children }) {
  const { username_set } = useUser();

  return (
    <>
      {username_set ? (
        children
      ) : (
        <h3 style={{ marginTop: "6rem" }}>
          You have not set up your username yet
        </h3>
      )}
    </>
  );
}
