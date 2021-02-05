import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'

export default function Header({ signOut, user }) {
  return (
    <header className={styles.header}>
      <div>
        <h4>miranchito.digital</h4>
      </div>
      <nav className={styles.nav}>
        <Link href="/">
          <div className={styles.nav_link}>
            <a>H</a>
          </div>
        </Link>
        {!user && (
          <Link href="/signin">
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
        <Link href="/demo">
          <div className={styles.nav_link}>
            <a>Demo</a>
          </div>
        </Link>
        <Link href="/sources">
          <div className={styles.nav_link}>
            <a>Recursos</a>
          </div>
        </Link>
        {user && <Avatar image={user?.image} alt={user?.name || user?.email} />}
      </nav>
    </header>
  )
}

const Avatar = ({ image, alt = '' }) => {
  return (
    <div>
      {image ? (
        <img
          className={styles.avatar}
          src={image}
          alt={alt.charAt(1).toUpperCase()}
        />
      ) : (
        <div className={styles.avatar}>{alt.charAt(0).toUpperCase()}</div>
      )}
    </div>
  )
}
