import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/NewEvent'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useEvents from '@raiz/src/hooks/useEvents'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditEvent() {
  const router = useRouter()
  const { getEvent } = useEvents()
  const { eventId } = router?.query
  const [event, setEvent] = useState(undefined)

  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then(setEvent)
    }
  }, [eventId])

  if (event === undefined) return 'Cargando...'

  return (
    <>
      <Head>
        <title>admin / Editar evento</title>
      </Head>
      <PrivateRoute
        Component={NewEvent}
        SecondaryLayout={DashboardCowsLayout}
        event={event}
        title={`Editar Evento`}
        editPage
      />
    </>
  )
}
