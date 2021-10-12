import { get_sheeps } from '@raiz/firebase/sheeps'
import { useAuth } from '@raiz/src/context/AuthContext'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function SheepsDasboard() {
  const [sheeps, setsheeps] = useState(undefined)
  const { user } = useAuth()
  useEffect(() => {
    if (user)
      get_sheeps(user.id)
        .then(({ res }) => {
          setsheeps(res)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [user])
  return (
    <div className="center">
      <Head>
        <title>Ganado | Borregos </title>
      </Head>
      Estado del Ganado
    </div>
  )
}
