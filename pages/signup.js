import Layout from '@cmps/Layout'
import LoginForm from '@cmps/SignForm/LoginForm'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Signup() {
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {
    user && router.push('/')
  }, [user])

  const handleSubmit = (form) => {
    console.log(form, 'send ')
  }

  return <LoginForm handleSubmit={handleSubmit} />
}
Signup.Layout = Layout
