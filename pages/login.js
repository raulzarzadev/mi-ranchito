import React, { useState } from 'react'
import Link from 'next/link'
import { firebaseClient } from '../firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const { emailLogin } = useAuth()
  const handleEmailLogin = () => {
    emailLogin(email, pass)
  }

  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={'Email'}
      />
      <input
        type={'password'}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder={'Password'}
      />
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .createUserWithEmailAndPassword(email, pass)
          window.location.href = '/'
        }}
      >
        Create account
      </button>
      <button onClick={handleEmailLogin}>Log in</button>
    </div>
  )
}
