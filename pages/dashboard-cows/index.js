import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function DashboardCows() {
  const router = useRouter()
  useEffect(() => {
    router.prefetch('/dashboard-cows/cows')
  })
  return (
    <>
      <div>Aqui podras ...</div>
    </>
  )
}

DashboardCows.SecondaryLayout = DashboardCowsLayout
