import firebaseClient from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'

!firebaseClient.apps.length && firebaseClient.initializeApp(firebaseConfig)
// firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION)

export const loginWithFacebook = async () => {
  const facebookProvider = new firebaseClient.auth.FacebookAuthProvider()

  const result = await firebaseClient
    .auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
      /** @type {firebaseClient.auth.OAuthCredential} */
      const credential = result.credential

      // The signed-in user info.
      const user = result.user

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = credential.accessToken
      return {
        user: {
          userId: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        },
        accessToken,
      }
    })
    .catch((error) => {
      console.log(error)
    })
  return result
}

export const loginWithEmail = async (email, pass) => {
  const result = await firebaseClient
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(({ user }) => {
      return {
        user: {
          userId: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        },
      }
    })
    .catch((err) => {
      return err
    })
  return result
}

/* export const signupEmail = async (email) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://miranchito.digital/registro',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'https://miranchito.digital',
    },
    android: {
      packageName: 'https://miranchito.digital',
      installApp: true,
      minimumVersion: '12',
    },
    dynamicLinkDomain: 'https://miranchito.digital/registro',
  }
  await firebaseClient
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      localStorage.setItem('emailForSignIn', email)
      // ...
      // window.location.href = '/'
    })
    .catch((err) => {
      return err
    })
} */

export const signupEmail = async (email, pass) => {
  const res = await firebaseClient
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .catch((err) => {
      return err
    })
  return res
}

export const logout = async () => {
  firebaseClient
    .auth()
    .signOut()
    .then(() => {
      console.log('signout')
    })
    .catch((error) => {
      console.log(error)
    })
}

const db = firebaseClient.firestore()
console.log(db && 'db ok')

export async function newCow(cow) {
  return await db
    .collection('cows')
    .add(cow)
    .catch((err) => console.log(err))
}

export function newEvent(event) {
  return db
    .collection('events')
    .add(event)
    .catch((err) => console.log(err))
}

export async function getUserCows(userId = '') {
  return (
    db
      .collection('cows')
      // .where('userId', '==', userId)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          return {
            id,
            ...data,
          }
        })
      })
  )
}

export function getUserEvents(userId = '') {
  return (
    db
      .collection('events')
      // .where('userId', '==', userId)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          return {
            id,
            ...data,
          }
        })
      })
  )
}

export { firebaseClient }
