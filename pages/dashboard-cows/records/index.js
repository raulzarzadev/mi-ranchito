import BtnLink from '@cmps/BtnLink/BtnLink'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import RecordsTable from '@cmps/RecordsTable/RecordsTable'
import React from 'react'

export default function AllRecords() {
  return (
    <>
      <BtnLink href="/dashboard-cows/newRecord" label="Nuevo Registro" />
      <h1>Registros</h1>
      <RecordsTable />
    </>
  )
}

AllRecords.SecondaryLayout = DashboardCowsLayout
