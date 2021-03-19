import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/NewEvent'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function newEvent() {
  const router = useRouter()

  const { cowId } = router.query
  console.log(cowId)
  return (
    <>
      <Head>
        <title>admin / Nuevo Evento</title>
      </Head>
      <NewEvent earringId={cowId} />
    </>
  )
}

newEvent.SecondaryLayout = DashboardCowsLayout
