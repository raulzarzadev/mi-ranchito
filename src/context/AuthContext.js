import { createContext, useContext, useEffect, useState } from 'react'

import nookies from 'nookies'
import {
  firebaseClient,
  loginWithEmail,
  loginWithFacebook,
  logout,
  signupEmail,
} from '@raiz/firebaseClient'

const AuthContext = createContext({
  user: firebaseClient.User || null,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)
  const [errors, setErrors] = useState(null)

  const facebookLogin = async () => {
    loginWithFacebook()
      .then((res) => {
        setUser(res.user)
        nookies.set(undefined, 'token', res.accessToken)
      })
      .catch((err) => {
        nookies.set(undefined, 'token', '')
        console.log(err)
      })
  }

  const emailLogin = (email, pass) => {
    loginWithEmail(email, pass)
      .then((res) => console.log(res))
      .catch((err) => setErrors(err))
  }

  const emailSingup = (email, pass) => {
    signupEmail(email, pass)
  }
  const signOut = () => {
    logout()
  }

  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
          id: user.uid,
        })
      } else {
        setUser(null)
        console.log('not user')
      }
    })
  }, [])

  // If do know status user, return

  return (
    <AuthContext.Provider
      value={{ user, errors, facebookLogin, emailLogin, signOut, emailSingup }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
