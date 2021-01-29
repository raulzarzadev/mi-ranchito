import React from 'react'
import Head from 'next/head'
import styles from './styles.module.css'
import { useAuth } from '@raiz/src/context/AuthContext'
import Header from '@cmps/Header/index.js/Header'

export default function Layout({ children }) {
  const { signOut, user } = useAuth()
  return (
    <div className={styles.body}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header signOut={signOut} user={user} />
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <footer className={styles.footer}>
        {'Una app creada por'} <a href="https://raulzarza.com">Raúl Zarza</a>
      </footer>
    </div>
  )
}
