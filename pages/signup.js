import LoginForm from '@cmps/SignForm/LoginForm'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Signup() {
  const router = useRouter()
  const { user, emailSingup } = useAuth()
  useEffect(() => {
    user && router.push('/')
  }, [user])

  const handleSubmit = (form) => {
    emailSingup(form.email, form.pass)
  }

  return <LoginForm handleSubmit={handleSubmit} />
}
