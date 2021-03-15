import { Btn1 } from '@cmps/Btns'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import UpcomingEvents from '@cmps/UpcomingEvents'
import ROUTES from '@raiz/constants/ROUTES'
import { useAuth } from '@raiz/src/context/AuthContext'
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
      <div className="box-1">
        <Btn1 href={ROUTES.events}> Ver Todos </Btn1>
      </div>
      <UpcomingEvents events={events} />
    </>
  )
}

upcoming.SecondaryLayout = DashboardCowsLayout
