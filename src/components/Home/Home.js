import { Btn1 } from '@cmps/Btns'
import ButtonLink from '@cmps/ButtonLink'
import styles from './styles.module.css'

export default function Home() {
  return (
    <div className="center">
      <div style={{ margin: '0 auto' }}>
        <h1>
          Bienvendido a <br /> Mi Ranchito Digital
        </h1>
        <img
          src="/assets/Logotipo.svg"
          alt="logo"
          className={styles.logotipo}
        />

        <p className={styles.description}>
          Una aplición para monitorear el ciclo
          <strong>productivo y reproductivo</strong> de las vacas lecheras.
        </p>
        <div className={styles.actions}>
          <Btn1 href="/dashboard-cows" label="Mis Vacas" />
        </div>
      </div>
    </div>
  )
}
