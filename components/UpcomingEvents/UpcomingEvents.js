import React from "react";
import EventRow from "../EventRow";
import styles from "./styles.module.css";

export default function UpcomingEvents({ events }) {
  function sortByNextEventDate(events) {
    events.sort((a, b) => {
      if (a.nextEvent.date > b.nextEvent.date) {
        return 1;
      }
      if (a.nextEvent.date < b.nextEvent.date) {
        return -1;
      }
      return 0;
    });
    return events;
  }
  const eventsSorted = sortByNextEventDate(events);

  return (
    <div>
      <h1>Proximos eventos</h1>

      <div>
        {events.length === 0 ? (
          <h3>No hay proximos eventos</h3>
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
    </div>
  );
}

