import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EarringTable from '@cmps/EarringTable'
import React from 'react'

export default function cows() {
  return (
    <div>
      <EarringTable />
    </div>
  )
}

cows.SecondaryLayout = DashboardCowsLayout
