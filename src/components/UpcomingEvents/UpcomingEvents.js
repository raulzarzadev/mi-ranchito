import React from "react";
import EventRow from "../EventRow";
import EventTable from "../EventTable";
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
    <>
      {events.length === 0 ? (
        <h5>No hay eventos aún</h5>
      ) : (
        <EventTable title="Historial" events={eventsSorted} />
      )}
    </>
  );
}
