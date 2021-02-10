import React, { useEffect } from 'react'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import LoginForm from '@cmps/SignForm/LoginForm'

export default function Login() {
  const router = useRouter()
  const LOGIN_PAGE = router.pathname === '/login'
  const { emailLogin, user } = useAuth()

  
  useEffect(() => {
    router.prefetch('/dashboard-cows')
    if (user) router.replace('/')
  }, [user])

  const handleSubmit = (form) => {
    emailLogin(form.email, form.pass)
  }

  return <LoginForm handleSubmit={handleSubmit} isLoginPage={LOGIN_PAGE} />
}
