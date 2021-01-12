import React from "react";
import styles from "./styles.module.css";

export default function EventRow({ event }) {
  return (
    <div className={styles.row}>
      <div className={styles.cell}>{event.earring}</div>
      <div className={styles.cell}>{event.name}</div>
      <div className={styles.cell}>{event.date}</div>
      <div className={styles.cell}>{event.nextEvent?.label}</div>
      <div className={styles.cell}>{event.nextEvent?.formatDate}</div>
    </div>
  );
}
