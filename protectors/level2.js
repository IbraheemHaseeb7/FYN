import { useLevel } from "../hooks/level";

export default function Level2({ children }) {
  const { level2 } = useLevel();

  return (
    <>
      {level2 ? (
        children
      ) : (
        <h3 style={{ marginTop: "6rem" }}>You are not given the access yet.</h3>
      )}
    </>
  );
}
