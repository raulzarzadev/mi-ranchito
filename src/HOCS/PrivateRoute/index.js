import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '@raiz/src/context/AuthContext'

export default function PrivateRoute({
  Component,
  SecondaryLayout,
  buttonBack,
  cattle,
  ...res
}) {
  const router = useRouter()
  const { user } = useAuth()
  const [userData, setUserData] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setUserData(user)
      setLoading(false)
    }
    if (user === null) router.replace('/')
  }, [user])

  if (SecondaryLayout) {
    return (
      <SecondaryLayout buttonBack>
        <Component {...res} user={loading ? {} : userData} />
      </SecondaryLayout>
    )
  }

  return <Component {...res} user={userData} />
}
