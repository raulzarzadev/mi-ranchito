import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import RecordsTable from '@cmps/RecordsTable/RecordsTable'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import { useRecords } from '@raiz/src/hooks/useRecords'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

export default function AllRecords() {
  const { getRecords } = useRecords()

  const [records, setRecords] = useState(undefined)

  useEffect(() => {
    getRecords().then(setRecords)
  }, [])

  if (records === undefined) return 'Cargando...'

  return (
    <>
      <Head>
        <title>admin / registros </title>
      </Head>
      <PrivateRoute
        Component={RecordsTable}
        SecondaryLayout={DashboardCowsLayout}
        records={records}
        title="Registros"
      />
    </>
  )
}
