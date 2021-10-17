import { H3 } from '@cmps/Texts/H'
import { L2 } from '@cmps/Texts/L'
import ROUTES from '@raiz/constants/ROUTES'
import styles from './styles.module.css'
export default function SubMenuNew(props) {
  const { cattleType } = props
  const title = {
    sheeps: 'Borrego',
    cows: 'Vaca',
  }
  const links = [
    {
      label: title[cattleType],
      href: `${ROUTES[cattleType]}/new`,
    },
    {
      label: 'Evento',
      href: `${ROUTES[cattleType]}/events/new`,
    },
    {
      label: 'Registro',
      href: `${ROUTES[cattleType]}/records/new`,
    },
  ]
  return (
    <div className={styles.menu_new}>
      <div className={styles.box}>
        <H3>- Nuevo -</H3>
      </div>
      {links.map((link, i) => (
        <div key={i} className={styles.box}>
          <L2 href={link.href}>{link.label}</L2>
        </div>
      ))}
    </div>
  )
}
