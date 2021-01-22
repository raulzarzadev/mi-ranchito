import React from "react";
import NewEarring from "../NewEarring";
import NewEventForm from "../NewEventForm";
import styles from "./styles.module.css";

export default function DemoView() {
  return (
    <div>
      <div className={styles.demo}>
        <div className={styles.demo_tab}>
          <h4>Nueva Vaca</h4>
        </div>
        <div className={styles.demo_tab}>
          <h4>Nuevo evento</h4>
        </div>
        <div className={styles.demo_tab}>
          <h4>Proximamente</h4>
        </div>
        <div className={styles.demo_tab}>
          <h4>Eventos</h4>
        </div>
        <div className={styles.demo_tab}>
          <h4>Vacas</h4>
        </div>
      </div>
      <div className={styles.demo_display}>
        <NewEarring />
      </div>
      <div className={styles.demo_display}>
        <NewEventForm />
      </div>
    </div>
  );
}
