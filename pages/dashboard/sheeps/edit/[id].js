import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import NewEarring from '@cmps/Forms/NewEarring'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import useCows from '@raiz/src/hooks/useCows'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

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
      <Head>
        <title>Inicio | Borregos</title>
      </Head>
      <PrivateRoute
        Component={NewEarring}
        SecondaryLayout={DashboardSheepsLayout}
        cow={cow}
        title="Editar"
        editPage
      />
    </>
  )
}