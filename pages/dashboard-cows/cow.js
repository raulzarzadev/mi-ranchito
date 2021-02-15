import CowDetails from '@cmps/CowDetails/CowDetails'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import { useRouter } from 'next/router'
import React from 'react'

export default function cow() {
  const router = useRouter()
  const { id } = router.query
  return <CowDetails cowId={id} />
}

cow.SecondaryLayout = DashboardCowsLayout
