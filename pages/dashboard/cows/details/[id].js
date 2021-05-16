import CowDetails from '@cmps/CowDetails/CowDetails'
import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'

export default function cow() {
  return (
    <>
      <Head>
        <title>admin / vaca detalles</title>
      </Head>
      <PrivateRoute
        Component={CowDetails}
        SecondaryLayout={DashboardCowsLayout}
      />
    </>
  )
}
