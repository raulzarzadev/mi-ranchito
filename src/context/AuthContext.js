import { createContext, useContext, useEffect, useState } from 'react'

import nookies from 'nookies'
import { firebaseClient } from '@raiz/firebaseClient'

const AuthContext = createContext({
  user: firebaseClient.User || null,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const facebookLogin = async () => {
    const facebookProvider = new firebaseClient.auth.FacebookAuthProvider()

    firebaseClient
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        /** @type {firebaseClient.auth.OAuthCredential} */
        const credential = result.credential

        // The signed-in user info.
        const user = result.user

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const accessToken = credential.accessToken

        // console.log(accessToken, user)
        nookies.set(undefined, 'token', accessToken)
        console.log(user)
        setUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        console.log(errorCode, errorMessage, credential, email)
        setUser(null)

        nookies.set(undefined, 'token', '')
        // ...
      })
  }

  const emailLogin = (email, pass) => {
    firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((res) => {
        const { user } = res
        setUser(user)
        //window.location.href = '/'
      })
      .catch((err) => {
        console.log(err)
        setUser(null)
      })
  }

  const signOut = () => {
    firebaseClient
      .auth()
      .signOut()
      .then((res) => {
        setUser(null)
        console.log(res)
        window.location.href = '/'
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', '')
      } else {
        const token = await user.getIdToken()

        nookies.set(undefined, 'token', token)
      }
    })
  }, [])

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])

  

  console.log(user)
  return (
    <AuthContext.Provider value={{ user:{ email:user?.email, }, facebookLogin, emailLogin, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
