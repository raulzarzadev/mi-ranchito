import EventTable from '@cmps/EventTable'
import Layout from '@cmps/Layout'
import useEvents from '@raiz/src/hooks/useEvents'
import React from 'react'

export default function events() {
  const { events } = useEvents()
  return (
    <div>
      <EventTable events={events} title="Todos Los Eventos" />
    </div>
  )
}

events.Layout = Layout
