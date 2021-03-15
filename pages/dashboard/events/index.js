import { Btn1 } from '@cmps/Btns'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EventTable from '@cmps/EventTable'
import ROUTES from '@raiz/constants/ROUTES'
import { useAuth } from '@raiz/src/context/AuthContext'
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
        setEvents(res.map((event) => formatEvent(event)))
      })
    }
  }, [user])

  if (events === undefined) return 'Cargando...'

  return (
    <>
      <Head>
        <title>admin / Eventos</title>
      </Head>
      <div className="box-1">
        <Btn1 href={`${ROUTES.upcommingEvents}`}> Ver Proximos </Btn1>
      </div>
      <EventTable events={events} title="Todos Los Eventos" />
    </>
  )
}

events.SecondaryLayout = DashboardCowsLayout
