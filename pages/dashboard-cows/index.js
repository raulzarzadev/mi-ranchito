import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function DashboardCows() {
  const router = useRouter()
  useEffect(() => {
    router.prefetch('/dashboard-cows/cows')
  })
  return (
    <>
      <h4> Vacas Lecheras</h4>
      <p>
        Registrar, Catalogar e Identifcar tus Vacas y Becerros nunuca habia sido
        tan fácil!
        {/*   Aquí podras catalogar, registrar y revisar el estado de tus vas,
        gestantes o lactantes. TODO para optimizar tus ganancias y garantizarle
        un buen estado de salud a tus vacas y becerros */}
      </p>
    </>
  )
}

DashboardCows.SecondaryLayout = DashboardCowsLayout
