import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import { H1 } from '@cmps/H'
import RecordsTable from '@cmps/RecordsTable/RecordsTable'
import React from 'react'

export default function AllRecords() {
  return (
    <>
      <H1>Registros</H1>
      <RecordsTable />
    </>
  )
}

AllRecords.SecondaryLayout = DashboardCowsLayout
