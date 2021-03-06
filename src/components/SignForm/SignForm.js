import { useAuth } from '@raiz/src/context/AuthContext'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function SignForm() {
  // const router = useRouter()
  const { facebookLogin, googleLogin, errors } = useAuth()
  const [errorsMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    if (errors?.code === 'auth/account-exists-with-different-credential') {
      setErrorMessage(
        'Este correo esta registrado con otra Metodo. Asegurate de usar el mismo'
      )
    } else {
      setErrorMessage(null)
    }
  }, [errors])

  /*  const handleSignEmail = () => {
    router.push('/login')
  } */
  console.log(errorsMessage)
  const handleSignFacebook = () => {
    facebookLogin()
  }
  const handleSignGoogle = () => {
    googleLogin()
  }

  return (
    <div className={styles.signin_page}>
      <div className={styles.form}>
        <div className={styles.form_title}>
          <h4>Ingresa</h4>
        </div>
        <div className={styles.form_input}>
          <div onClick={handleSignGoogle} className={styles.sign_button}>
            Ingresa con Gmail
          </div>
        </div>
        <div className={styles.form_input}>
          <div onClick={handleSignFacebook} className={styles.sign_button}>
            Ingresa con Facebook
          </div>
        </div>

        <div className={styles.form_errors}>
          <em>{errorsMessage}</em>
        </div>
        {/*
        <div className={styles.form_input}>
        <SignEmail handleClick={handleSignEmail} />
        </div> 
        <div className={styles.form_input}>
        <Link href="/signup">
        <div className={styles.ligth_link}>o Registrate</div>
        </Link>
        </div> 
      */}
      </div>
    </div>
  )
}
