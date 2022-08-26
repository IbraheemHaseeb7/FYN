import { useState } from "react";
import ManageBar from "../../../components/manageBar/managebar";
import Table from "../../../components/manageData/table";
import styles from "../../../styles/manage.module.css";

export default function Manage() {
  const [active, setActive] = useState("videos");

  return (
    <div className={styles.main_container}>
      <h1 className={styles.h1}>Manage and Delete data here</h1>
      <div className={styles.inner_container}>
        <ManageBar setActive={setActive} />
        <Table active={active} />
      </div>
    </div>
  );
}
