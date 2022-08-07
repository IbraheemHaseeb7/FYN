import useLevel from "../hooks/level";

export default function Level3({ children }) {
  const { level3, ebook } = useLevel();

  return (
    <>
      {level3 || ebook ? (
        children
      ) : (
        <h3 style={{ marginTop: "6rem" }}>You are not given the access yet.</h3>
      )}
    </>
  );
}
