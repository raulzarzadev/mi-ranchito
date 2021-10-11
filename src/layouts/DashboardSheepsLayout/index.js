import Modal from '@cmps/Modals/Modal/Modal'
import { P3 } from '@cmps/Texts/P'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { H1, H2, H3 } from '@cmps/Texts/H'
import { useRouter } from 'next/router'
import useSheeps from '@raiz/src/hooks/useSheeps'

export default function SheepsDasboard() {
  const { getSheeps } = useSheeps()
  const [sheeps, setsheeps] = useState(undefined)
  useEffect(() => {
    getSheeps()
      .then((res) => {
        setsheeps(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="center">
      <Head>
        <title>Ganado | Borregos </title>
      </Head>
      Ganado Borregos
    </div>
  )
}
