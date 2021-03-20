import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEarring from '@cmps/NewEarring'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import React from 'react'

export default function Private() {
  return (
    <>
      <Head>
        <title>admin / Nueva vaca</title>
      </Head>
      <PrivateRoute
        Component={NewEarring}
        SecondaryLayout={DashboardCowsLayout}
        title="Nueva Vaca"
      />
    </>
  )
}