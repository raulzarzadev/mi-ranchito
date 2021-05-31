import ButtonBack from '@cmps/Inputs/ButtonBack'
import ROUTES from '@raiz/constants/ROUTES'
import React from 'react'
import BottomNav from './BottomNav'
import SideNav from './SideNav/SideNav'
import styles from './styles.module.css'

const links = [
  /*   {
    cat: 'main',
    side: 'primary',
    id: '129',
    href: ROUTES.configuration,
    label: 'Configuración',
  }, */
  {
    cat: 'main',
    side: 'primary',
    id: '129',
    href: ROUTES.dashboard,
    label: 'Ganado'
  },
  {
    cat: 'main',
    side: 'primary',
    id: '5',
    href: ROUTES.events,
    label: 'Eventos',
  },

  {
    cat: 'cows',
    side: 'primary',
    id: '1',
    href: ROUTES.cows,
    label: 'Vacas',
  },
  {
    cat: 'events',
    side: 'primary',
    id: '9',
    href: ROUTES.events,
    label: 'Eventos',
  },
  {
    cat: 'records',
    side: 'primary',
    id: '569',
    href: ROUTES.records,
    label: 'Registros',
  },
  /* {
    side: 'primary',
    id: '8',
    href: '/dashboard/records',
    label: 'Registros',
  }, */
  {
    cat: 'cows',
    side: 'secondary',
    id: '2',
    href: ROUTES.newCow,
    label: 'Nueva Vaca',
  },
  {
    cat: 'events',
    side: 'secondary',
    id: '3',
    href: ROUTES.newEvent,
    label: 'Nuevo Evento',
  },
  {
    cat: 'records',
    side: 'secondary',
    id: 'sdfew3',
    href: ROUTES.newRecord,
    label: 'Nuevo Registro',
  },

  {
    side: 'bottom',
    id: '122',
    href: ROUTES.dashboard,
    label: 'Dash',
    icon: '/assets/icons/farm.svg',
  },
  {
    side: 'bottom',
    id: '12',
    href: ROUTES.cows,
    label: 'Vacas',
    icon: '/assets/icons/cows.svg',
  },
  {
    side: 'bottom',
    id: '12765',
    href: ROUTES.records,
    label: 'Regs',
  },
  {
    side: 'bottom',
    id: '13',
    href: ROUTES.events,
    label: 'Eventos',
  },
  {
    side: 'bottom',
    id: '13',
    href: ROUTES.news,
    label: 'Nuevo',
  },
]

export default function DashboardCowsLayout({ children, buttonBack }) {
  return (
    <div className={styles.cows_dashboard}>
      {buttonBack && <ButtonBack />}
      <div className={styles.dash_container}>{children}</div>
      <SideNav links={links} />
      <BottomNav links={links.filter((link) => link.side === 'bottom')} />
    </div>
  )
}
