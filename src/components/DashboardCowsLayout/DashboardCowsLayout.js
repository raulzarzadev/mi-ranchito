import Link from 'next/link'
import React from 'react'

export default function DashboardCowsLayout({ children }) {
  return (
    <div>
      <div>
        <h3>Menu del dashboard</h3>
        <Link href="/dashboard-cows/cows">Vacas</Link>
        <Link href="/dashboard-cows/newCow">Nueva Vaca</Link>
        <Link href="/dashboard-cows/newEvent">Nuevo Evento</Link>
        <Link href="/dashboard-cows/events">Eventos</Link>
      </div>
      <div>{children}</div>
    </div>
  )
}
