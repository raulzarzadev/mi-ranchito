import CowDetails from '@cmps/DashboardCowsLayout/CowDetails/CowDetails'
import { useRouter } from 'next/router'
import React from 'react'

export default function cow() {
  const router = useRouter()
  const { id } = router.query
  return <CowDetails cowId={id} />
}
