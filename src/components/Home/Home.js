import ButtonLink from '@cmps/ButtonLink'
import { useAuth } from '@raiz/src/context/AuthContext'
import styles from './styles.module.css'

export default function Home() {
  const { user } = useAuth()
  return (
    <div className="center">
      <div style={{ margin: '0 auto' }}>
        <h1>
          Bienvendido a <br /> Mi Ranchito Digital
        </h1>

        <p className={styles.description}>
          Una aplición para monitorear el ciclo
          <strong>productivo y reproductivo</strong> de las vacas lecheras.
        </p>
        <div className={styles.actions}>
          {user ? (
            <ButtonLink href="/dashboard-cows" label="Mis Vacas" />
          ) : (
            <ButtonLink href="/signin" label="Ingresa " />
          )}
        </div>
      </div>
    </div>
  )
}
