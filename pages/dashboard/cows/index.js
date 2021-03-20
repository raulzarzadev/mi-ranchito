import CowsTable from '@cmps/CowsTable'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EarringTable from '@cmps/EarringTable'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useCows from '@raiz/src/hooks/useCows'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

export default function Cows() {
  const { getCows } = useCows()
  const [cows, setCows] = useState(undefined)

  useEffect(() => {
    getCows().then((res) => setCows(res))
  }, [])

  console.log(cows)

  if (cows === undefined) return 'Cargando...'

  return (
    <>
      <Head>
        <title>admin / todas las vacas</title>
      </Head>
      <PrivateRoute
        Component={CowsTable}
        SecondaryLayout={DashboardCowsLayout}
        earrings={cows}
        title="Vacas Registradas"
      />
    </>
  )
}
