import React from 'react'
import styles from './styles.module.css'
import DashNav from '@cmps/DashNav/DashNav'

const links = [
  { id: '5', href: '/dashboard-cows/upcoming', label: 'Proximos' },
  { id: '2', href: '/dashboard-cows/newCow', label: 'Nueva Vaca' },
  { id: '6', href: '/dashboard-cows/newRecord', label: 'Nuevo Registro' },
  { id: '3', href: '/dashboard-cows/newEvent', label: 'Nuevo Evento' },
  { id: '1', href: '/dashboard-cows/cows', label: 'Vacas' },
  { id: '4', href: '/dashboard-cows/events', label: 'Eventos' },
  { id: '7', href: '/dashboard-cows/cow', label: 'Detalles de Vaca' },
]

export default function DashboardCowsLayout({ children }) {
  return (
    <>
      <DashNav links={links} />
      <div className={styles.dash_container}>{children}</div>
    </>
  )
}
