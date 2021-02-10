import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEarring from '@cmps/NewEarring'
import React from 'react'

export default function newCow() {
  return (
    <>
      <NewEarring />
    </>
  )
}

newCow.SecondaryLayout = DashboardCowsLayout
