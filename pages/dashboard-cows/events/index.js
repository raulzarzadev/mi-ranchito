import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EventTable from '@cmps/EventTable'
import useEvents from '@raiz/src/hooks/useEvents'
import Head from 'next/head'
import React from 'react'

export default function events() {
  const { events } = useEvents()
  return (
    <>
      <Head>
        <title>admin / Eventos</title>
      </Head>
      <EventTable events={events} title="Todos Los Eventos" />
    </>
  )
}

events.SecondaryLayout = DashboardCowsLayout
