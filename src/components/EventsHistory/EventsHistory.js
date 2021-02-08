import useEvents from '@raiz/src/hooks/useEvents'
import React from 'react'
import EventTable from '../EventTable'

export default function EventsHistory() {
  const { events } = useEvents()
  return (
    <>
      {events.length === 0 ? (
        <h3>No hay eventos aún</h3>
      ) : (
        <EventTable title="Historial" events={events} />
      )}
    </>
  )
}
