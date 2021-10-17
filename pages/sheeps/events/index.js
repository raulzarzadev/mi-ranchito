import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import EventTable from '@cmps/Tables/EventTable'
import { useAuth } from '@raiz/src/context/AuthContext'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useEvents from '@raiz/src/hooks/useEvents'
import { formatEvent } from '@raiz/src/utils'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Events from '@cmps/Events'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'
import { get_sheeps_events } from '@raiz/firebase/sheeps/events'

export default function events() {
  /*   const { user } = useAuth()
  const { getEvents } = useEvents()
  
  useEffect(() => {
    if (user) {
      getEvents().then(setEvents)
    }
  }, [user]) */
  useEffect(() => {
    console.log(get_sheeps_events().message)
  }, [])
  const [events, setEvents] = useState([])

  return (
    <>
      <Head>
        <title>Eventos | Borregos</title>
      </Head>

      <PrivateRoute
        Component={Events}
        SecondaryLayout={DashboardSheepsLayout}
        events={events}
      />
    </>
  )
}
d .