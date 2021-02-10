import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEarring from '@cmps/NewEarring'
import { getCow } from '@raiz/firebaseClient'
import { useRouter } from 'next/router'
import React from 'react'

export default function editCow() {
  const router = useRouter()
  const { cowId } = router.query
  const { cow } = getCow(cowId)
  return (
    <>
      <NewEarring cow={cow} editPage />
    </>
  )
}

editCow.DashboardCowsLayout = DashboardCowsLayout
