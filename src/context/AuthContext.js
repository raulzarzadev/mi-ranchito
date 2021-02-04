import { createContext, useContext, useEffect, useState } from 'react'

import nookies from 'nookies'
import {
  firebaseClient,
  loginWithEmail,
  loginWithFacebook,
  loginWithGoogleMail,
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
