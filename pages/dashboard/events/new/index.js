import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/NewEvent'
import Head from 'next/head'

export default function newEvent() {
  return (
    <>
      <Head>
        <title>admin / Nuevo Evento</title>
      </Head>
      <NewEvent />
    </>
  )
}

newEvent.SecondaryLayout = DashboardCowsLayout
