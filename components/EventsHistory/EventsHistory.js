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
      <h4>Historial de eventos</h4>
      {events.length === 0 ? (
        <h5>No hay eventos aún</h5>
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


