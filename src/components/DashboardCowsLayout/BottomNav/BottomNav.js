import L2 from '@cmps/L2/L2'
import styles from './styles.module.css'

export default function BottomNav() {
  return (
    <div className={styles.navigation}>
      <L2 href="/" label="Vacas" />
      <L2 href="/" label="Eventos" />
      <L2 href="/" label="Nuevo" />
    </div>
  )
}
