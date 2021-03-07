import React from 'react'
import { useRouter } from 'next/router'
import NewRecord from '@cmps/NewRecord'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
function NewRecordView() {
  const router = useRouter()
  const { earring, earringId } = router?.query
  return <NewRecord earring={{ earring, earringId }} />
}
export default function Private() {
  return <PrivateRoute Component={NewRecordView} />
}

NewRecordView.SecondaryLayout = DashboardCowsLayout
