import { H1, H3 } from '@cmps/H'
import Head from 'next/head'
import styles from './styles.module.css'

export default function CowsDasboard() {
  return (
    <>
      <Head>
        <title>admin / Vacas </title>
      </Head>
      <div className={styles.cows_dasboard}>
        <H1>Vacas</H1>
        <H3>Estadisticas</H3>
      </div>
    </>
  )
}
