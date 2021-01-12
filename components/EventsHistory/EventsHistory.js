import React from "react";
import EventRow from "../EventRow";
import styles from "./styles.module.css";

export default function EventsHistory({ events }) {
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
      {events.length === 0 ? (
        <h3>No hay eventos aún</h3>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}


