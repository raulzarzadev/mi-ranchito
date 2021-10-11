import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import RecordsTable from '@cmps/Tables/RecordsTable/RecordsTable'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import { useRecords } from '@raiz/src/hooks/useRecords'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

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
        <title>Nuevo Registro | Borregos </title>
      </Head>
      <PrivateRoute
        Component={RecordsTable}
        SecondaryLayout={DashboardSheepsLayout}
        records={records}
        title="Registros"
      />
    </>
  )
}
