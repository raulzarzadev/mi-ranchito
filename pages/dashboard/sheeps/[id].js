import CowDetails from '@cmps/Details/CowDetails/CowDetails'
import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

export default function cow() {
  return (
    <>
      <Head>
        <title>Detalles | Borregos</title>
      </Head>
      <PrivateRoute
        Component={CowDetails}
        SecondaryLayout={DashboardSheepsLayout}
        buttonBack
      />
    </>
  )
}
