import Head from 'next/head'
import Home from '@cmps/views/Home/Home'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mi Ranchito Digital</title>
      </Head>
      <Home />

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
