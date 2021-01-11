import React from "react";
import styles from "./styles.module.css";

export default function EventsHistory({ events }) {
  console.log(events);
  function sortByDate(events) {
    events.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      return 0;
    });
    return events;
  }
  const eventsSorted = sortByDate(events);

  return (
    <div>
      <h1>Historial de eventos</h1>
      <div className={styles.columnsTitles}>
        <div>Arete</div>
        <div>Evento</div>
        <div>Fecha</div>
        <div>Revisar</div>
        <div>Fecha</div>
      </div>
      {eventsSorted.map((event, i) => (
        <EventRow key={i} event={event} />
      ))}
    </div>
  );
}

function EventRow({ event }) {
  return (
    <div className={styles.row}>
      <div className={styles.cell}>{event.arete}</div>
      <div className={styles.cell}>{event.name}</div>
      <div className={styles.cell}>{event.date}</div>
      <div className={styles.cell}>{event.nextEvent?.label}</div>
      <div className={styles.cell}>{event.nextEvent?.formatDate}</div>
    </div>
  );
}
