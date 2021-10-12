import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'
import SheepDetails from '@cmps/Details/SheepDetails'

export default function cow() {
  return (
    <>
      <Head>
        <title>Detalles | Borregos</title>
      </Head>
      <PrivateRoute
        Component={SheepDetails}
        SecondaryLayout={DashboardSheepsLayout}
        buttonBack
      />
    </>
  )
}
