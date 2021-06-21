import CowsTable from '@cmps/Tables/CowsTable'
import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useCows from '@raiz/src/hooks/useCows'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Cows() {
  const { getCows } = useCows()
  const [cows, setCows] = useState(undefined)
  const {query} = useRouter()
  console.log('query', query)
  

  useEffect(() => {
    getCows().then((res) => setCows(res))
  }, [])


  
  return (
    <>
      <Head>
        <title>admin / todas las vacas</title>
      </Head>
      
      <PrivateRoute
        Component={CowsTable}
        SecondaryLayout={DashboardCowsLayout}
        cows={cows}
        title="Vacas Registradas"
      />
    </>
  )
}
