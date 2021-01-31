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
    .catch((err) => console.log(err))
  return result
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
  console.log(event)
  return db
    .collection('events')
    .add(event)
    .catch((err) => console.log(err))
}

export async function getUserCows(userId = '') {
  return db
    .collection('cows')
    .where('userId', '==', userId)
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
}

export function getUserEvents(userId = '') {
  return db
    .collection('events')
    .where('userId', '==', userId)
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
}

export { firebaseClient }
