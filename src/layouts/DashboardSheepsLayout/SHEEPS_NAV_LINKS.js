import ROUTES from '@raiz/constants/ROUTES'

export default [
  /*   {
    cat: 'main',
    side: 'primary',
    id: '129',
    href: `${ROUTES.sheeps}/configuration`,
    label: 'Configuración',
  }, */
  {
    cat: 'main',
    side: 'primary',
    id: '129',
    href: `${ROUTES.sheeps}/won`,
    label: 'Ganado',
  },
  {
    cat: 'main',
    side: 'primary',
    id: '5',
    href: `${ROUTES.sheeps}/events`,
    label: 'Eventos',
  },

  {
    cat: 'won',
    side: 'primary',
    id: '1',
    href: `${ROUTES.sheeps}`,
    label: 'Borregos',
  },
  {
    cat: 'events',
    side: 'primary',
    id: '9',
    href: `${ROUTES.sheeps}/events`,
    label: 'Eventos',
  },
  /* {
    cat: 'records',
    side: 'primary',
    id: '569',
    href: `${ROUTES.sheeps}/records`,
    label: 'Registros',
  }, */
  /* {
    side: 'primary',
    id: '8',
    href: '/dashboard/records',
    label: 'Registros',
  }, */
  {
    cat: 'won',
    side: 'secondary',
    id: '2',
    href: `${ROUTES.sheeps}/new`,
    label: 'Nuevo',
  },
  {
    cat: 'events',
    side: 'secondary',
    id: '3',
    href: `${ROUTES.sheeps}/events/new`,
    label: 'Nuevo',
  },
  /*  {
    cat: 'records',
    side: 'secondary',
    id: 'sdfew3',
    href: `${ROUTES.sheeps}/newRecord`,
    label: 'Nuevo Registro',
  },
 */
  {
    side: 'bottom',
    id: '122',
    href: `${ROUTES.sheeps}/dashboard`,
    label: 'Dash',
    icon: '/assets/icons/farm.svg',
  },
  {
    side: 'bottom',
    id: '12',
    href: `${ROUTES.sheeps}/cows`,
    label: 'Vacas',
    icon: '/assets/icons/cows.svg',
  },
  /*  {
    side: 'bottom',
    id: '12765',
    href: `${ROUTES.sheeps}/records`,
    label: 'Regs',
  }, */
  {
    side: 'bottom',
    id: '13',
    href: `${ROUTES.sheeps}/events`,
    label: 'Eventos',
  },
  {
    side: 'bottom',
    id: '13',
    href: `${ROUTES.sheeps}/sub-menu`,
    label: 'Nuevo',
  },
]
