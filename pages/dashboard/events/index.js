import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EventTable from '@cmps/EventTable'
import { useAuth } from '@raiz/src/context/AuthContext'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useEvents from '@raiz/src/hooks/useEvents'
import { formatEvent } from '@raiz/src/utils'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

export default function events() {
  const { user } = useAuth()
  const { getEvents } = useEvents()
  const [events, setEvents] = useState()

  useEffect(() => {
    if (user) {
      getEvents().then((res) => {
        setEvents(res?.map((event) => formatEvent(event)))
      })
    }
  }, [user])

  if (events === undefined) return 'Cargando...'

  return (
    <>
      <Head>
        <title>admin / Eventos</title>
      </Head>

      <PrivateRoute
        Component={EventTable}
        SecondaryLayout={DashboardCowsLayout}
        events={events}
        title="Todos los eventos"
      />
    </>
  )
}
