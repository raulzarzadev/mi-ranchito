import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import NewRecord from '@cmps/NewRecord'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'

export default function newRecord() {
  return (
    <>
      <Head>
        <title>admin / Nuevo Registro</title>
      </Head>
      <PrivateRoute
        Component={NewRecord}
        SecondaryLayout={DashboardCowsLayout}
        title="Nuevo Registro"
      />
    </>
  )
}
