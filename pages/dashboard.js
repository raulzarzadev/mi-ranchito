import { useAuth } from '@raiz/src/context/AuthContext'
import Router from 'next/router'
import React, { useEffect } from 'react'

export default function dashboard() {
  const { user } = useAuth()
  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [])
  return <div>dashboard</div>
}
