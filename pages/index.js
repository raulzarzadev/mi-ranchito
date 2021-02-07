import Head from 'next/head'
import styles from 'styles/Home.module.css'
import Layout from 'src/components/Layout'
import ButtonLink from 'src/components/ButtonLink'
import { useAuth } from '@raiz/src/context/AuthContext'
import { formatEvent, formatType } from '@raiz/src/utils'

console.log(formatType('parto'))
console.log(
  formatEvent({
    date: '2020-09-17',
    earring: '13-azul',
    event: 'serv',
    id: 'vxtn7au3Ov0BTYXXDiLG',
    userId: 'QldWfcY4yZPUrHBe1s6wKZocSwB3',
  })
)

export default function Home() {
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>Mi Ranchito Digital</title>
      </Head>

      <h1>
        Bienvendido a <br /> Mi Ranchito Digital
      </h1>

      <p className={styles.description}>
        Una aplición para monitorear el ciclo{' '}
        <strong>productivo y reproductivo</strong> de las vacas lecheras.
      </p>
      {user ? (
        <div className={styles.actions}>
          <ButtonLink href="/dashboard" label="Mis Vacas" />
        </div>
      ) : (
        <div className={styles.actions}>
          <ButtonLink href="/demo" label="Demo Vacas lecheras" />
        </div>
      )}
    </>
  )
}

Home.Layout = Layout
