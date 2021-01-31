import Layout from '@cmps/Layout'
import ManageCows from '@cmps/ManageCows/ManageCows'
import Head from 'next/head'

export default function Dashboard() {
  /* console.log(user)
  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, []) */

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
