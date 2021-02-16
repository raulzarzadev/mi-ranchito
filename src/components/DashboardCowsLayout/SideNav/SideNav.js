import { H3 } from '@cmps/H'
import { L2 } from '@cmps/L'
import styles from './styles.module.css'

export default function SideNav({ links = [] }) {
  return (
    <div className={styles.side_navigation}>
      <div className={`${styles.common} ${styles.side_logo}`}>Logo</div>
      <div className={`${styles.common} ${styles.side_links}`}>
        <div className={styles.link_section}>
          <H3>- Ver -</H3>
          {links.map((link, i) => (
            <div key={i}>
              {link.side === 'primary' && (
                <div>
                  <L2 href={link.href}>{link.label}</L2>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.link_section}>
          <H3>- Nuevo -</H3>
          {links.map((link, i) => (
            <div key={i}>
              {link.side === 'secondary' && (
                <div>
                  <L2 href={link.href}>{link.label}</L2>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.common} ${styles.side_options}`}>Opciones</div>
    </div>
  )
}
