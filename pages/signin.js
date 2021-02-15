import SignForm from '@cmps/SignForm/SignForm'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styles from '../styles/sign_page.module.css
export default function Signin() {
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {
    user && router.replace('/')
  }, [user])
  return (
    <div className={styles.sign_page}>
      <SignForm />
    </div>
  )
}

