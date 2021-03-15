import { createContext, useContext, useEffect, useState } from 'react'

import nookies from 'nookies'
import {
  onAuthStateChanged,
  loginWithEmail,
  loginWithFacebook,
  loginWithGoogleMail,
  logout,
  signupEmail,
} from '@raiz/firebase/client'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const router = useRouter()

  const [user, setUser] = useState(undefined)
  const [errors, setErrors] = useState(null)
  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const facebookLogin = async () => {
    loginWithFacebook()
      .then((res) => {
        setUser(res.user)
        nookies.set(undefined, 'token', res.accessToken)
      })
      .catch((err) => {
        nookies.set(undefined, 'token', '').log(err)
        setErrors(err)
      })
  }

  const emailLogin = (email, pass) => {
    loginWithEmail(email, pass)
      .then((res) => setUser(res?.user))
      .catch((err) => setErrors(err))
  }

  const emailSingup = (email, pass) => {
    signupEmail(email, pass)
  }
  const signOut = () => {
    router.replace('/')
    logout()
  }

  const googleLogin = async () => {
    loginWithGoogleMail()
      .then((res) => {
        setUser(res?.user)
      })
      .catch((err) => {
        setErrors(err)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        facebookLogin,
        emailLogin,
        signOut,
        emailSingup,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
