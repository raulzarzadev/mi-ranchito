import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EventTable from '@cmps/EventTable'
import useEvents from '@raiz/src/hooks/useEvents'
import React from 'react'

export default function events() {
  const { events } = useEvents()
  return (
    <>
      <EventTable events={events} title="Todos Los Eventos" />
    </>
  )
}

events.SecondaryLayout = DashboardCowsLayout