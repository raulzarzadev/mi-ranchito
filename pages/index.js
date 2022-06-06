import Home from '@cmps/views/Home/Home'
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mi Ranchito Digital</title>
        <meta name='icon' href='/miranchito.png' />
        <meta name='description' content='Mejora la gestión de tu granja, incrementa tus ganancias y accede a información real sobre el mejor cuidado de tus animales. Mi Ranchito Digital ' />
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
