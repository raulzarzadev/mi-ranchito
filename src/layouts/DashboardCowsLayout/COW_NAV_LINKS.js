import ROUTES from '@raiz/constants/ROUTES'

export default [
  /*   {
    cat: 'main',
    side: 'primary',
    id: '129',
    href: `${ROUTES.cows}/configuration`,
    label: 'Configuración',
  }, */
  {
    cat: 'main',
    side: 'primary',
    id: '129',
    href: `${ROUTES.cows}`,
    label: 'Ganado',
  },
  {
    cat: 'main',
    side: 'primary',
    id: '5',
    href: `${ROUTES.cows}/events`,
    label: 'Eventos',
  },

  {
    cat: 'cows',
    side: 'primary',
    id: '1',
    href: `${ROUTES.cows}/cows`,
    label: 'Vacas',
  },
  {
    cat: 'events',
    side: 'primary',
    id: '9',
    href: `${ROUTES.cows}/events`,
    label: 'Eventos',
  },
  /* {
    cat: 'records',
    side: 'primary',
    id: '569',
    href: `${ROUTES.cows}/records`,
    label: 'Registros',
  }, */
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
    href: `${ROUTES.cows}/new`,
    label: 'Nueva Vaca',
  },
  {
    cat: 'events',
    side: 'secondary',
    id: '3',
    href: `${ROUTES.cows}/events/new`,
    label: 'Nuevo Evento',
  },
  /*  {
    cat: 'records',
    side: 'secondary',
    id: 'sdfew3',
    href: `${ROUTES.cows}/newRecord`,
    label: 'Nuevo Registro',
  },
 */
  {
    side: 'bottom',
    id: '122',
    href: `${ROUTES.cows}`,
    label: 'Dash',
    icon: '/assets/icons/farm.svg',
  },
  {
    side: 'bottom',
    id: '12',
    href: `${ROUTES.cows}/cows`,
    label: 'Vacas',
    icon: '/assets/icons/cows.svg',
  },
  /*  {
    side: 'bottom',
    id: '12765',
    href: `${ROUTES.cows}/records`,
    label: 'Regs',
  }, */
  {
    side: 'bottom',
    id: '13',
    href: `${ROUTES.cows}/events`,
    label: 'Eventos',
  },
  {
    side: 'bottom',
    id: '13',
    href: `${ROUTES.cows}/sub-menu`,
    label: 'Nuevo',
  },
]
