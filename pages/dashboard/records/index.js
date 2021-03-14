import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import { H1 } from '@cmps/H'
import RecordsTable from '@cmps/RecordsTable/RecordsTable'
import { useRecords } from '@raiz/src/hooks/useRecords'
import React, { useEffect, useState } from 'react'

export default function AllRecords() {
  const { getRecords } = useRecords()

  const [records, setRecords] = useState(undefined)

  useEffect(() => {
    getRecords().then(setRecords)
  }, [])

  console.log(records)

  if (records === undefined) return 'Cargando...'

  return (
    <>
      <H1>Registros</H1>
      <RecordsTable records={records} />
    </>
  )
}

AllRecords.SecondaryLayout = DashboardCowsLayout
