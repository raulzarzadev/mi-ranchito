import React from 'react'
import { useRouter } from 'next/router'
import NewRecord from '@cmps/NewRecord'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
export default function newRecord() {
  const router = useRouter()
  const { earring, earringId } = router?.query
  return <NewRecord earring={{ earring, earringId }} />
}

newRecord.SecondaryLayout = DashboardCowsLayout
