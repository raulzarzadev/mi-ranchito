import React from 'react'
import BottomNav from './BottomNav'
import SideNav from './SideNav/SideNav'
import styles from './styles.module.css'

const links = [
  {
    side: 'primary',
    id: '5',
    href: '/dashboard-cows/upcoming',
    label: 'Proximos',
  },
  { side: 'primary', id: '1', href: '/dashboard-cows/cows', label: 'Vacas' },
  {
    side: 'primary',
    id: '9',
    href: '/dashboard-cows/events',
    label: 'Eventos',
  },

  {
    side: 'primary',
    id: '8',
    href: '/dashboard-cows/records',
    label: 'Registros',
  },
  {
    side: 'secondary',
    id: '3',
    href: '/dashboard-cows/newEvent',
    label: 'Nuevo Evento',
  },
  {
    side: 'primary',
    id: '7',
    href: '/dashboard-cows/cow',
    label: 'Detalles de Vaca',
  },
  {
    side: 'secondary',
    id: '6',
    href: '/dashboard-cows/newRecord',
    label: 'Nuevo Registro',
  },
  {
    side: 'secondary',
    id: '2',
    href: '/dashboard-cows/newCow',
    label: 'Nueva Vaca',
  },
  {
    side: 'bottom',
    id: '12',
    href: '/dashboard-cows/cows',
    label: 'Vacas',
  },
  {
    side: 'bottom',
    id: '13',
    href: '/dashboard-cows/events',
    label: 'Eventos',
  },
  {
    side: 'bottom',
    id: '13',
    href: '/dashboard-cows/new',
    label: 'Nuevo',
  },
]

export default function DashboardCowsLayout({ children }) {
  return (
    <div className={styles.cows_dashboard}>
      <div className={styles.dash_container}>{children}</div>

      <BottomNav links={links.filter((link) => link.side === 'bottom')} />
      <SideNav links={links} />
    </div>
  )
}
