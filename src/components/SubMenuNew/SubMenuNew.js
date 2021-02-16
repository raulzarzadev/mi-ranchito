import { H3 } from '@cmps/H'
import { L2 } from '@cmps/L'
import styles from './styles.module.css'

const links = [
  {
    label: 'Vaca',
    href: '/dashboard-cows/newCow',
  },
  {
    label: 'Evento',
    href: '/dashboard-cows/newEvent',
  },
  {
    label: 'Registro',
    href: '/dashboard-cows/newRecord',
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
