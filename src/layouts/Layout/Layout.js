import React from 'react'
import Head from 'next/head'
import styles from './styles.module.css'
import Header from '@cmps/views/Header/index.js/Header'
import { useAuth } from '@raiz/src/context/AuthContext'

export default function Layout({ children }) {
  const { signOut, user } = useAuth()
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.body}>
       <Header signOut={signOut} user={user} /> 
        <main className={styles.main_container}>{children}</main>
      </div>
    </>
  )
}
