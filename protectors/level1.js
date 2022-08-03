import { useLevel } from "../hooks/level";

export default function Level1({ children }) {
  const { level1 } = useLevel();

  return (
    <>
      {level1 ? (
        children
      ) : (
        <h3 style={{ marginTop: "6rem" }}>You are not given the access yet.</h3>
      )}
    </>
  );
}
