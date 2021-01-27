import React from "react";
import EventTable from "../EventTable";

export default function EventsHistory({ events }) {
  return (
    <>
      {events.length === 0 ? (
        <h3>No hay eventos aún</h3>
      ) : (
        <EventTable title="Historial" events={events} />
      )}
    </>
  );
}
