import ButtonLink from '@cmps/ButtonLink'
import styles from './styles.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <div style={{ margin: '0 auto' }}>
        <h1>
          Bienvendido a <br /> Mi Ranchito Digital
        </h1>

        <p className={styles.description}>
          Una aplición para monitorear el ciclo
          <strong>productivo y reproductivo</strong> de las vacas lecheras.
        </p>
        <div className={styles.actions}>
          <ButtonLink href="/dashboard-cows" label="Mis Vacas" />
        </div>
      </div>
    </div>
  )
}
