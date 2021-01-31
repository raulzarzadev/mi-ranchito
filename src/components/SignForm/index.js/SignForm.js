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
    <>
      <div>
        <SignEmail handleClick={handleSignEmail} />
      </div>
      <div>
        <SignFacebook handleClick={handleSignFacebook} />
      </div>
      <div className={styles.ligth_link}>o crea una cuenta nueva</div>
    </>
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
