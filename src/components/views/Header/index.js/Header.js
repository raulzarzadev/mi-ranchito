import { L } from '@cmps/Texts/L'
import ROUTES from '@raiz/constants/ROUTES'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'

export default function Header({ signOut, user }) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <L href={ROUTES.home}>
          <img
            src="/assets/Logo.svg"
            alt="hola"
            className={styles.image_logo}
          />
        </L>

        <Link href={`${ROUTES.sources}`}>
          <div className={styles.nav_link}>
            <a>Recursos</a>
          </div>
        </Link>
        {!user && (
          <Link href={`${ROUTES.signin}`}>
            <div className={styles.nav_link}>
              <a>Ingresa</a>
            </div>
          </Link>
        )}
        {user && (
          <div className={styles.nav_link} onClick={signOut}>
            <a>Salir</a>
          </div>
        )}
        {user && <Avatar image={user?.image} alt={user?.name || user?.email} />}
      </nav>
    </header>
  )
}

const Avatar = ({ image, alt = '' }) => {
  return (
    <div>
      {image ? (
        <L href={ROUTES.home}>
          <img
            className={styles.avatar}
            src={image}
            alt={alt.charAt(1).toUpperCase()}
          />
        </L>
      ) : (
        <div className={styles.avatar}>{alt.charAt(0).toUpperCase()}</div>
      )}
    </div>
  )
}
