import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import UpcomingEvents from '@cmps/UpcomingEvents'
import { useAuth } from '@raiz/src/context/AuthContext'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useEvents from '@raiz/src/hooks/useEvents'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function upcoming() {
  const { user } = useAuth()
  const { getEvents } = useEvents()
  const [events, setEvents] = useState(undefined)

  useEffect(() => {
    if (user) {
      getEvents().then(setEvents)
    }
  }, [user])

  if (events === undefined) return 'Cargando...'

  return (
    <>
      <Head>
        <title>admin / Proximamente</title>
      </Head>
      <PrivateRoute
        Component={UpcomingEvents}
        events={events}
        SecondaryLayout={DashboardCowsLayout}
      />
    </>
  )
}