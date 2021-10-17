import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/Forms/NewEvent'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useEvents from '@raiz/src/hooks/useEvents'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditEvent() {
  const router = useRouter()
  const { getEvent } = useEvents()
  const { id } = router?.query
  const [event, setEvent] = useState(undefined)

  useEffect(() => {
    if (id) {
      getEvent(id).then(setEvent)
    }
  }, [id])
  

  if (event === undefined) return 'Cargando...'

  return (
    <>
      <Head>
        <title>Editar | Borrego</title>
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
