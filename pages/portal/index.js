import PortalBar from "../../components/portalbar/portalbar";
import styles from "../../styles/portal.module.css";
import Level from "../../protectors/levels";
import Footer from "../../components/footer/footer";
import Metatags from "../../components/meta/meta";
import zIndex from "@mui/material/styles/zIndex";

export default function Portal() {
  return (
    <Level>
      <Metatags
        title="User Portal"
        logo="logo.png"
        description={`A portal for fight your nafs users to manage their account and interact with the website more. Users can also post their own questions on the forum and interact with others`}
      />
      <div className={styles.main_container}>
        <PortalBar />
        <h1>Choose an option from the left</h1>
      </div>
      <div style={{ position: "absolute", zIndex: "10", width: "100%" }}>
        <Footer />
      </div>
    </Level>
  );
}
