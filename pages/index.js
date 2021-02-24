import Head from 'next/head'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Home from '@cmps/Home/Home'

export default function HomePage() {
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
      <div className='center'>
        <Home />
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
