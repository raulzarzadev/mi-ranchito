import { Btn1 } from '@cmps/Btns'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import UpcomingEvents from '@cmps/UpcomingEvents'
import Head from 'next/head'

export default function upcoming() {
  return (
    <>
      <Head>
        <title>admin / Proximamente</title>
      </Head>
      <div className='box-1'>
        <Btn1 href="/dashboard-cows/events"> Ver Todos </Btn1>
      </div>
      <UpcomingEvents />
    </>
  )
}

upcoming.SecondaryLayout = DashboardCowsLayout
