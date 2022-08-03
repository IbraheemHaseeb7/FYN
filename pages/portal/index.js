import PortalBar from "../../components/portalbar/portalbar";
import styles from "../../styles/portal.module.css";
import Level from "../../protectors/levels";

export default function Portal() {
  return (
    <Level>
      <div className={styles.main_container}>
        <PortalBar />
        <h1>Choose an option from the left</h1>
      </div>
    </Level>
  );
}
