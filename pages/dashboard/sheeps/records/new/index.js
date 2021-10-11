import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import NewRecord from '@cmps/Forms/NewRecord'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

export default function newRecord() {
  return (
    <>
      <Head>
        <title>Nuevo Registro | Borregos</title>
      </Head>
      <PrivateRoute
        Component={NewRecord}
        SecondaryLayout={DashboardSheepsLayout}
        title="Nuevo Registro"
      />
    </>
  )
}
