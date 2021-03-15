import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import EarringTable from '@cmps/EarringTable'
import useCows from '@raiz/src/hooks/useCows'
import React, { useEffect, useState } from 'react'

export default function Cows() {
  const { getCows } = useCows()
  const [cows, setCows] = useState(undefined)

  useEffect(() => {
    getCows().then((res) => setCows(res))
  }, [])

  console.log(cows)

  if (cows === undefined) return 'Cargando...'

  return (
    <>
      <EarringTable earrings={cows} title={'Todos lo aretes'} />
    </>
  )
}

Cows.SecondaryLayout = DashboardCowsLayout
