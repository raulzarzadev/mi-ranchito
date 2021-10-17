import ROUTES from '@raiz/constants/ROUTES'

export default [
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  //           SIDE NAV
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  {
    cat: 'main',
    side: 'primary',
    id: '129',
    href: `${ROUTES.sheeps.cattle()}`,
    label: 'General',
  },
  {
    cat: 'main',
    side: 'primary',
    id: '5',
    href: `${ROUTES.sheeps.events()}`,
    label: 'Eventos',
  },

  {
    cat: 'Cattle',
    side: 'primary',
    id: '1',
    href: `${ROUTES.sheeps.index}`,
    label: 'Borregos',
  },
  {
    cat: 'Cattle',
    side: 'secondary',
    id: '2',
    href: `${ROUTES.sheeps.new()}`,
    label: 'Nuevo',
  },
  {
    cat: 'events',
    side: 'primary',
    id: '9',
    href: `${ROUTES.sheeps.events()}`,
    label: 'Eventos',
  },

  {
    cat: 'events',
    side: 'secondary',
    id: '3',
    href: `${ROUTES.sheeps.events()}/new`,
    label: 'Nuevo',
  },

  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  //           BOTTOM NAV
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  {
    side: 'bottom',
    id: '122',
    href: ROUTES.sheeps.index,
    label: 'Dash',
    icon: '/assets/icons/farm.svg',
  },
  {
    side: 'bottom',
    id: '12',
    href: `${ROUTES.sheeps.cattle()}`,
    label: 'Cattle',
    icon: '/assets/icons/cows.svg',
  },

  {
    side: 'bottom',
    id: '13',
    href: `${ROUTES.sheeps.events()}`,
    label: 'Eventos',
  },
  {
    side: 'bottom',
    id: '13',
    href: `${ROUTES.sheeps.index}/sub-menu`,
    label: 'Nuevo',
  },
]
