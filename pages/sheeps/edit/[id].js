import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'
import { get_sheep } from '@raiz/firebase/sheeps'
import FormSheep from '@cmps/Forms/FormSheep/index.js'

export default function EditSheep() {
  const router = useRouter()
  const { id } = router.query
  const [sheep, setSheep] = useState(undefined)
  useEffect(() => {
    if (id) {
      get_sheep(id).then(({ res }) => setSheep(res))
    }
  }, [id])

  return (
    <>
      <Head>
        <title>Inicio | Borregos</title>
      </Head>
      <PrivateRoute
        Component={FormSheep}
        SecondaryLayout={DashboardSheepsLayout}
        sheep={sheep}
        title="Editar Borrego"
        editPage
      />
    </>
  )
}
