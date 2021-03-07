import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '@raiz/src/context/AuthContext'

export default function PublicRoute({ Component, ...res }) {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      router.replace('/')
    }
    if (user === null) return setLoading(false)
  }, [user])

  if (loading) return 'Cargando...'

  return <Component {...res} />
}
