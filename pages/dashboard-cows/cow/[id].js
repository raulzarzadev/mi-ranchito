import CowDetails from '@cmps/CowDetails/CowDetails'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'

import React from 'react'

export default function cow() {
  return <CowDetails />
}

cow.SecondaryLayout = DashboardCowsLayout
