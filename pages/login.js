import React, { useEffect, useState } from 'react'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import LoginForm from '@cmps/SignForm/LoginForm'
import Layout from '@cmps/Layout'

export default function Login() {
  const { emailSingup, emailLogin, user } = useAuth()
  const router = useRouter()

  const LOGIN_PAGE = router.pathname === '/login'
  const handleSubmit = (form) => {
    LOGIN_PAGE ? emailLogin(form.email, form.pass) : emailSingup(form.email)
  }

  useEffect(() => {
    if (user) {
      console.log('redirect')
      router.push('/')
    }
  }, [user])

  return <LoginForm handleSubmit={handleSubmit} isLoginPage={LOGIN_PAGE} />
}

Login.Layout = Layout
