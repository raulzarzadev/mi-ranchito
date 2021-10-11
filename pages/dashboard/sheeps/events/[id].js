import EventDetails from '@cmps/Details/EventDetails/EventDetails'
import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useEvents from '@raiz/src/hooks/useEvents'
import { useRouter } from 'next/router'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

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
        <title>Detelles event | Borregos</title>
      </Head>
      <PrivateRoute
        Component={EventDetails}
        event={event}
        SecondaryLayout={DashboardSheepsLayout}
      />
    </>
  )
}
