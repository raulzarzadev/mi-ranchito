import React, { useEffect } from 'react'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import LoginForm from '@cmps/SignForm/LoginForm'
import Layout from '@cmps/Layout'

export default function Login() {
  const router = useRouter()
  const LOGIN_PAGE = router.pathname === '/login'
  const { emailLogin, user } = useAuth()

  useEffect(() => {
    user && router.push('/')
  }, [user])
  
  const handleSubmit = (form) => {
    emailLogin(form.email, form.pass)
  }


  return <LoginForm handleSubmit={handleSubmit} isLoginPage={LOGIN_PAGE} />
}

Login.Layout = Layout
