import Head from 'next/head'
import styles from 'styles/Home.module.css'
import ButtonLink from 'src/components/ButtonLink'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (user === null) router.replace('/login')
  })

  return (
    <>
      <Head>
        <title>Mi Ranchito Digital</title>
      </Head>

      <h1>
        Bienvendido a <br /> Mi Ranchito Digital
      </h1>

      <p className={styles.description}>
        Una aplición para monitorear el ciclo
        <strong>productivo y reproductivo</strong> de las vacas lecheras.
      </p>
      <div className={styles.actions}>
        <ButtonLink href="/dashboard-cows" label="Mis Vacas" />
      </div>
      {/*  <div className={styles.actions}>
          <ButtonLink href="/demo" label="Demo Vacas lecheras" />
        </div> */}
    </>
  )
}

// TODO Evento revision, comentarios , evento aleatorio
// TODO Seleccionar autor del evento, escribir obs
// TODO gesta exitosa -> aproximado
// TODO if parto => select sexo
// TODO nueva vaca, crear padre
// TODO nueva vaca, nac / registro
// TODO Cambiar id de vacas a earring - string - nickNmae
// TODO nuevo envento aborto / venta /
