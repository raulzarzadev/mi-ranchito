import Layout from '@cmps/Layout'
import SignForm from '@cmps/SignForm/index.js/SignForm'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Signin() {
  const router = useRouter()
  const { user } = useAuth()
  console.log(user)
  useEffect(() => {
    user && router.replace('/')
  }, [user])
  return (
    <div>
      Ingresa
      <SignForm />
    </div>
  )
}

Signin.Layout = Layout
