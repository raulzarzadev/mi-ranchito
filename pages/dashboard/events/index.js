import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import EventTable from '@cmps/Tables/EventTable'
import { useAuth } from '@raiz/src/context/AuthContext'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useEvents from '@raiz/src/hooks/useEvents'
import { formatEvent } from '@raiz/src/utils'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Events from '@cmps/Events'

export default function events() {
  const { user } = useAuth()
  const { getEvents } = useEvents()
  const [events, setEvents] = useState()

  useEffect(() => {
    if (user) {
      getEvents().then(setEvents)
    }
  }, [user])

  return (
    <>
      <Head>
        <title>admin / Eventos</title>
      </Head>

      <PrivateRoute
        Component={Events}
        SecondaryLayout={DashboardCowsLayout}
        events={events}
      />
    </>
  )
}
