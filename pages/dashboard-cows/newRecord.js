import React from 'react'
import { useRouter } from 'next/router'
import NewRecord from '@cmps/NewRecord'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
export default function newRecord() {
  const router = useRouter()
  const { earring } = router?.query
  console.log(earring)
  return <NewRecord earring={earring} />
}

newRecord.SecondaryLayout = DashboardCowsLayout
