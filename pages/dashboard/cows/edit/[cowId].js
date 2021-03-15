import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEarring from '@cmps/NewEarring'
import useCows from '@raiz/src/hooks/useCows'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function editCow() {
  const router = useRouter()
  const { getCow } = useCows()
  const { cowId } = router.query
  const [cow, setCow] = useState(undefined)
  useEffect(() => {
    if (cowId) {
      getCow(cowId).then((res) => setCow(res))
    }
  }, [cowId])

  return (
    <>
      <NewEarring cow={cow} editPage />
    </>
  )
}

editCow.DashboardCowsLayout = DashboardCowsLayout
