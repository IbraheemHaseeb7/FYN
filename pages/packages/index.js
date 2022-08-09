import Package from "../../components/package/package";
import styles from "../../styles/packages.module.css";
import Footer from "../../components/footer/footer";
import useLevelApply from "../../hooks/levelapply";
import Metatags from "../../components/meta/meta";
import { useContext } from "react";
import { UserContext } from "../_app";

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
  const { level1, level2, level3 } = useLevelApply();

  return (
    <div className={styles.main_container}>
      <Metatags
        title="Packages"
        image="logo.png"
        description={`Choose a package of your choice and learn more about fight your nafs.`}
      />
      <h1>Packages</h1>
      <div className={styles.packages_container}>
        <Package
          title={`Level 1`}
          points={first}
          price={`50`}
          button={`apply for level 1`}
          level="level1"
          applied={level1}
        />
        <Package
          title={`Level 2`}
          points={second}
          price={`75`}
          button={`apply for level 2`}
          level="level2"
          applied={level2}
        />
        <Package
          title={`Level 3`}
          level="level3"
          points={third}
          price={`99`}
          button={`apply for level 3`}
          applied={level3}
        />
      </div>
      <Footer />
    </div>
  );
}
