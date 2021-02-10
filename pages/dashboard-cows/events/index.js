import BtnLink from '@cmps/BtnLink/BtnLink'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EventTable from '@cmps/EventTable'
import useEvents from '@raiz/src/hooks/useEvents'
import React from 'react'

export default function events() {
  const { events } = useEvents()
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BtnLink href={'/dashboard-cows/newEvent'} label="Nuevo Evento" />
        <BtnLink href={'/dashboard-cows/upcoming'} label="Proximos Eventos" />
      </div>
      <EventTable events={events} title="Todos Los Eventos" />
    </>
  )
}

events.SecondaryLayout = DashboardCowsLayout
