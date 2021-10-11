import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/Forms/NewEvent'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'

export default function newEvent() {
  
  return (
    <>
      <Head>
        <title>admin / Nuevo Evento</title>
      </Head>
      <PrivateRoute
        SecondaryLayout={DashboardCowsLayout}
        Component={NewEvent}
        title="Nuevo Evento"
      />
    </>
  )
}
