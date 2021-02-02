import React, { useEffect } from 'react'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import LoginForm from '@cmps/SignForm/LoginForm'
import Layout from '@cmps/Layout'

export default function Login() {
  const router = useRouter()
  const LOGIN_PAGE = router.pathname === '/login'
  const { emailSingup, emailLogin, user } = useAuth()

  const handleSubmit = (form) => {
    LOGIN_PAGE ? emailLogin(form.email, form.pass) : emailSingup(form.email)
  }

  useEffect(() => {
    user && router.push('/')
  }, [user])

  return <LoginForm handleSubmit={handleSubmit} isLoginPage={LOGIN_PAGE} />
}

Login.Layout = Layout
