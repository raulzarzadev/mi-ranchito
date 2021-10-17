import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/Forms/NewEvent'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

export default function newEvent() {
  
  return (
    <>
      <Head>
        <title>Nuevo Evento | Borregos</title>
      </Head>
      <PrivateRoute
        SecondaryLayout={DashboardSheepsLayout}
        Component={NewEvent}
        title="Nuevo Evento"
      />
    </>
  )
}
