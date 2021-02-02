import Layout from '@cmps/Layout'
import ManageCows from '@cmps/ManageCows/ManageCows'
import { useAuth } from '@raiz/src/context/AuthContext'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  if (!user) router.replace('/')

  return (
    <div>
      <Head>
        <title>Mi Ranchito - vacas</title>
      </Head>
      <ManageCows />
    </div>
  )
}

Dashboard.Layout = Layout
