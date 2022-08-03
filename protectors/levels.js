import useLevel from "../hooks/level";

export default function Levels({ children }) {
  const { level1, level2, level3, ebook } = useLevel();
  return (
    <>
      <>{(level3 || level2 || level1 || ebook) && children}</>
    </>
  );
}
