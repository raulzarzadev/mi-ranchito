import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEarring from '@cmps/NewEarring'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import React from 'react'

function NewCow() {
  return <NewEarring />
}

export default function Private() {
  return <PrivateRoute Component={NewCow} SecondaryLayout={DashboardCowsLayout}/>
}

