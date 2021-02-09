import Head from 'next/head'
import styles from 'styles/Home.module.css'
import ButtonLink from 'src/components/ButtonLink'
import { useAuth } from '@raiz/src/context/AuthContext'

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
          <ButtonLink href="/dashboard-cows" label="Mis Vacas" />
        </div>
      ) : (
        <div className={styles.actions}>
          <ButtonLink href="/demo" label="Demo Vacas lecheras" />
        </div>
      )}
    </>
  )
}
