import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './styles.module.css'

export default function SignForm() {
  const router = useRouter()
  const { facebookLogin } = useAuth()

  const handleSignEmail = () => {
    router.push('/login')
  }
  const handleSignFacebook = () => {
    facebookLogin()
  }

  return (
    <div className={styles.form}>
      <div className={styles.form_input}>
        <SignEmail handleClick={handleSignEmail} />
      </div>
      <div className={styles.form_input}>
        <SignFacebook handleClick={handleSignFacebook} />
      </div>
      <div className={styles.form_input}>
        <div className={styles.ligth_link}>o crea una cuenta nueva</div>
      </div>
    </div>
  )
}

function SignEmail({ handleClick }) {
  return (
    <div onClick={handleClick} className={styles.sign_button}>
      ingresa con tu Email
    </div>
  )
}
function SignFacebook({ handleClick }) {
  return (
    <div onClick={handleClick} className={styles.sign_button}>
      ingresa con Facebook
    </div>
  )
}
