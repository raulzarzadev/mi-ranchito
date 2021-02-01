import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'

export default function Login() {
  const { emailSingup, emailLogin, user } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  useEffect(() => {
    if (user) {
      console.log('redirect')
      router.push('/')
    }
  }, [user])

  const handleEmailLogin = () => {
    emailLogin(email, pass)
  }

  const handleSignUpWithEmail= () => {
    emailSingup(email)
  
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
        onClick={handleSignUpWithEmail}
      >
        Create account
      </button>
      <button onClick={handleEmailLogin}>Log in</button>
    </div>
  )
}
