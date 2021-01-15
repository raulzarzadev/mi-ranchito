import React from "react";
import EventTable from "../EventTable";

export default function EventsHistory({ events }) {
  return (
    <>
      {events.length === 0 ? (
        <h5>No hay eventos aún</h5>
      ) : (
        <EventTable title="Historial" events={events} />
      )}
    </>
  );
}
