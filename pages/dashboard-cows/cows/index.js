import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EarringTable from '@cmps/EarringTable'
import { getUserCows } from '@raiz/firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'
import { formatEvent } from '@raiz/src/utils'
import React, { useEffect, useState } from 'react'

export default function Cows() {
  const { user } = useAuth()
  const [cows, setCows] = useState()

  useEffect(() => {
    if (user) {
      getUserCows(user.id)
        .then((res) => {
          setCows(res)
          setCows(res.map((event) => formatEvent(event)))
        })
        .catch((err) => {
          console.log(err)
          setCows(null)
        })
    }
  }, [user])

  return (
    <>
      <EarringTable earrings={cows} title={'Todos lo aretes'} />
    </>
  )
}

Cows.SecondaryLayout = DashboardCowsLayout
