import { useLevel } from "../hooks/level";

export default function EBook({ children }) {
  const { ebook } = useLevel();

  return (
    <>
      {ebook ? (
        children
      ) : (
        <h3 style={{ marginTop: "6rem" }}>You are not given the access yet.</h3>
      )}
    </>
  );
}
