import SignForm from '@cmps/SignForm/SignForm'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
export default function Signin() {
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {
    user && router.replace('/')
  }, [user])
  return (
    <div >
      <SignForm />
    </div>
  )
}

  