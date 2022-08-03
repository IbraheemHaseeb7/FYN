import Package from "../../components/package/package";
import styles from "../../styles/packages.module.css";
import Footer from "../../components/footer/footer";

const first = [
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
];
const second = [
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
];
const third = [
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
  "This is the first thing",
  "This is the second thing",
  "This is the third thing",
];

export default function Packages() {
  return (
    <div className={styles.main_container}>
      <h1>Packages</h1>
      <div className={styles.packages_container}>
        <Package
          title={`Level 1`}
          points={first}
          price={`50`}
          button={`apply for level 1`}
        />
        <Package
          title={`Level 2`}
          points={second}
          price={`75`}
          button={`apply for level 2`}
        />
        <Package
          title={`Level 3`}
          points={third}
          price={`99`}
          button={`apply for level 3`}
        />
      </div>
      <Footer />
    </div>
  );
}
