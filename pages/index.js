import Head from 'next/head'
import styles from 'styles/Home.module.css'
import Layout from 'src/components/Layout'
import ButtonLink from 'src/components/ButtonLink'
import { useAuth } from '@raiz/src/context/AuthContext'

export default function Home() {
  const { user } = useAuth()
  return (
    <>
      <Head>
        <title>Mi Ranchito Digital</title>
      </Head>

      <h1 >Bienvendido a miranchito digital</h1>

      <p className={styles.description}>
        Administra mejor e incrementa tus ganacias
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
