import { useAuth } from '@raiz/src/context/AuthContext'
import Head from 'next/head'
import React from 'react'
import Layout from 'src/components/Layout'
import ManageCows from 'src/components/ManageCows/ManageCows'
export default function Demo() {
  const { user } = useAuth()
  console.log(user)
  return (
    <>
      <Head>
        <title>Mi Ranchito - vacas</title>
      </Head>
      <em>
        Esta pestaña es solo de demostracón, los cambios <strong> NO </strong>
        se guardaran de forma permanete. <br />
        Para reinciar los valores, recarga la página o presiona
        <strong>F5</strong>
      </em>
      <ManageCows />
    </>
  )
}

Demo.Layout = Layout
