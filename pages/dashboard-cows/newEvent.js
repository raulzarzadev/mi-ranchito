import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/NewEvent'
import React from 'react'

export default function newEvent() {
  return (
    <>
      <NewEvent />
    </>
  )
}

newEvent.SecondaryLayout = DashboardCowsLayout
