import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEarring from '@cmps/NewEarring'
import React from 'react'

export default function newCow() {
  return (
    <div>
      <NewEarring />
    </div>
  )
}

newCow.SecondaryLayout = DashboardCowsLayout
