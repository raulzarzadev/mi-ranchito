import { L2 } from '@cmps/Texts/L'
import ROUTES from '@raiz/constants/ROUTES'
import styles from './styles.module.css'
export default function SubMenuNew() {
  const links = [
    {
      label: 'Nuevo Borrego',
      href: `${ROUTES.sheeps.new()}`,
    },
    {
      label: 'Nuevo Evento',
      href: `${ROUTES.sheeps.events()}/new`,
    },
  ]
  return (
    <div className={styles.menu_new}>
      {links.map((link, i) => (
        <div key={i} className={styles.box}>
          <L2 href={link.href}>{link.label}</L2>
        </div>
      ))}
    </div>
  )
}
