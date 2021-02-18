import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EarringTable from '@cmps/EarringTable'
import { getUserCows, getUserEvents } from '@raiz/firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'
import { formatEventsByEarring } from '@raiz/src/utils'
import React, { useEffect, useState } from 'react'

export default function Cows() {
  const { user } = useAuth()

  const [cows, setCows] = useState(undefined)

  const getCowsEvents = async (userId) => {
    const cows = await getUserCows(userId)
    const events = await getUserEvents(userId)
    return formatEventsByEarring(cows, events)
  }

  useEffect(() => {
    if (user) {
      getCowsEvents(user.id).then((res) => setCows(res))
    }
  }, [user])

  if (cows === undefined) return 'Cargando...'

  return (
    <>
      <EarringTable earrings={cows} title={'Todos lo aretes'} />
    </>
  )
}

Cows.SecondaryLayout = DashboardCowsLayout
