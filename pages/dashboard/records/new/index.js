import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewRecord from '@cmps/NewRecord'
import Head from 'next/head'

export default function newRecord() {
  
  return (
    <>
      <Head>
        <title>admin / Nuevo Evento</title>
      </Head>
      <NewRecord />
    </>
  )
}

newRecord.SecondaryLayout = DashboardCowsLayout
