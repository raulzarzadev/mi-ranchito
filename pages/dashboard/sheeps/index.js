import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import React from 'react'
import SheepsTable from '@cmps/Tables/SheepsTable'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

export default function Cows() {
  return (
    <>
      <Head>
        <title>Ranchito | Borregos</title>
      </Head>

      <PrivateRoute
        Component={SheepsTable}
        SecondaryLayout={DashboardSheepsLayout}
      />
    </>
  )
}
