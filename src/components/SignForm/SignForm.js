import { useAuth } from '@raiz/src/context/AuthContext'
import Link from 'next/link'
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
      <div className={styles.form_title}>
        <h4>Ingresa</h4>
      </div>
      <div className={styles.form_input}>
        <SignEmail handleClick={handleSignEmail} />
      </div>
      <div className={styles.form_input}>
        <SignFacebook handleClick={handleSignFacebook} />
      </div>
      <div className={styles.form_input}>
        <Link href="/signup">
          <div className={styles.ligth_link}>o Registrate</div>
        </Link>
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
