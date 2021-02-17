import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EventTable from '@cmps/EventTable'
import { getUserEvents } from '@raiz/firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'
import { formatEvent } from '@raiz/src/utils'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

export default function events() {
  const { user } = useAuth()
  const [events, setEvents] = useState()
  
  useEffect(() => {
    if (user) {
      getUserEvents(user.id)
        .then((res) => {
          setEvents(res)
          setEvents(res.map((event) => formatEvent(event)))
        })
        .catch((err) => {
          console.log(err)
          setEvents(null)
        })
    }
  }, [user])

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
