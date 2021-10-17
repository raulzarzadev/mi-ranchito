import Button from '@cmps/Inputs/Button'
import { H2 } from '@cmps/Texts/H'
import P from '@cmps/Texts/P/P'
import ROUTES from '@raiz/constants/ROUTES'
import { useAuth } from '@raiz/src/context/AuthContext'
import styles from './styles.module.css'

export default function Home() {
  const { user } = useAuth()
  console.log('user', user)

  return (
    <div className="center">
      <div style={{ margin: '0 auto' }}>
        <H2>
          Bienvendido a <br /> Mi Ranchito Digital
        </H2>
        <img
          src="/assets/Logotipo.svg"
          alt="logo"
          className={styles.logotipo}
        />

        <P className={styles.description}>
          Una aplición para monitorear el ciclo
          <strong>productivo y reproductivo</strong> de las vacas lecheras.
        </P>
        <div className={styles.actions}>

          {user ? (
            <>
              <Button p="2" fullwidth primary nextLink href={`${ROUTES.cows}`}>
                Mis Vacas
              </Button>
              <Button p="2" fullwidth primary nextLink href={`${ROUTES.sheeps.dashboard}`}>
                Mis Borregos
              </Button>
            </>
          ) : (
            <Button p="2" primary nextLink href={`${ROUTES.signin}`}>
              Ingresa
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
