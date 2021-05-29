import { H3 } from '@cmps/Texts/H'
import { L2 } from '@cmps/Texts/L'
import ROUTES from '@raiz/constants/ROUTES'
import styles from './styles.module.css'

const links = [
  {
    label: 'Vaca',
    href: ROUTES.newCow
  },
  {
    label: 'Evento',
    href: ROUTES.newEvent
  },
  {
    label: 'Registro',
    href: ROUTES.newRecord
  },
]
export default function SubMenuNew() {
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
