import useEvents from '@raiz/src/hooks/useEvents'
import React from 'react'
import EventTable from '../EventTable'

export default function EventsHistory() {
  const { formatedEvents } = useEvents()
  const events = formatedEvents
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
