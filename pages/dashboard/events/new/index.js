import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/NewEvent'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function newEvent() {
  const router = useRouter()
  const { cowId } = router.query
  
  return (
    <>
      <Head>
        <title>admin / Nuevo Evento</title>
      </Head>
      <PrivateRoute
        SecondaryLayout={DashboardCowsLayout}
        Component={NewEvent}
        earringId={cowId}
        title="Nuevo Evento"
      />
    </>
  )
}
