import EventDetails from '@cmps/EventDetails/EventDetails'
import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useEvents from '@raiz/src/hooks/useEvents'
import { useRouter } from 'next/router'

export default function cow() {
  const [event, setEvent] = useState({})
  const { getEvent } = useEvents()
  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    if (id) {
      getEvent(id).then(setEvent)
    }
  }, [id])

  return (
    <>
      <Head>
        <title>admin / vaca detalles</title>
      </Head>
      <PrivateRoute
        Component={EventDetails}
        event={event}
        SecondaryLayout={DashboardCowsLayout}
      />
    </>
  )
}
