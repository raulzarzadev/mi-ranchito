import firebaseClient from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyChGGTMisnbRri0Vv7Ug6AQXUsGWxzK6jE',
  authDomain: 'ranchito-95fa6.firebaseapp.com',
  databaseURL: 'https://ranchito-95fa6-default-rtdb.firebaseio.com/',
  projectId: 'ranchito-95fa6',
  storageBucket: 'ranchito-95fa6.appspot.com',
  messagingSenderId: '613301118746',
  appId: '1:613301118746:web:60dd2458d11185d2d02ea3',
  measurementId: 'G-3WEPWQNX0Q',
}

!firebaseClient.apps.length && firebaseClient.initializeApp(firebaseConfig)
// firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION)

const db = firebaseClient.firestore()
console.log(db)
export async function newCow(cow) {
  console.log('nueva vaca')
  const res = await db
    .collection('cows')
    .add({ earring: '001', name: 'pinta', birth: '2001-12-12' })
  console.log(res)
}
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
    .then((res) => {
      console.log(res)
      return {
        user: {
          email: res.user.email,
          name: res.user.displayName,
          image: res.user.photoURL,
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

export { firebaseClient }
