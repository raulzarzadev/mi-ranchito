import React from 'react'
import styles from './styles.module.css'
import DashNav from '@cmps/DashNav/DashNav'

const links = [
  { id: '1', href: '/dashboard-cows/cows', label: 'Vacas' },
  { id: '2', href: '/dashboard-cows/newCow', label: 'Nueva Vaca' },
  { id: '3', href: '/dashboard-cows/newEvent', label: 'Nuevo Evento' },
  { id: '4', href: '/dashboard-cows/events', label: 'Eventos' },
  { id: '5', href: '/dashboard-cows/upcoming', label: 'Proximos' },
]

export default function DashboardCowsLayout({ children }) {
  return (
    <>
      <DashNav links={links} />
      <div className={styles.dash_container}>{children}</div>
    </>
  )
}
