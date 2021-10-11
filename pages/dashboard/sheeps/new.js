import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import React from 'react'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'
import NewSheep from '@cmps/Forms/NewSheep'

export default function Private() {
  return (
    <>
      <Head>
        <title>Ranchito | Nuevo borrego</title>
      </Head>
      <PrivateRoute
        Component={NewSheep}
        SecondaryLayout={DashboardSheepsLayout}
        buttonBack
      />
    </>
  )
}
