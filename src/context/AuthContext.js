import { createContext, useContext, useEffect, useState } from 'react'

import nookies from 'nookies'
import {
  firebaseClient,
  loginWithEmail,
  loginWithFacebook,
  logout,
} from '@raiz/firebaseClient'

const AuthContext = createContext({
  user: firebaseClient.User || null,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

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
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err))
  }

  const signOut = () => {
    logout()
  }

  // console.log(user)
  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async (data) => {
      // console.log(data)
      if (!data) {
        setUser(null)
        nookies.set(undefined, 'token', '')
      } else {
        const token = await data.getIdToken()
        setUser({
          email: data.email,
          name: data.displayName,
          image: data.photoURL,
        })
        // console.log(data)
        // console.log(user)
        nookies.set(undefined, 'token', token)
      }
    })
  }, [])
  // console.log(user)

  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(handle)
      const user = firebaseClient.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])

  // console.log(user)

  return (
    <AuthContext.Provider value={{ user, facebookLogin, emailLogin, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
