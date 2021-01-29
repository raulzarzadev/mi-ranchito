import firebaseClient from 'firebase/app'
import 'firebase/auth'

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
    firebaseClient.initializeApp({
    apiKey: "AIzaSyChGGTMisnbRri0Vv7Ug6AQXUsGWxzK6jE",
    authDomain: "ranchito-95fa6.firebaseapp.com",
    databaseURL: "https://ranchito-95fa6-default-rtdb.firebaseio.com/",
    projectId: "ranchito-95fa6",
    storageBucket: "ranchito-95fa6.appspot.com",
    messagingSenderId: "613301118746",
    appId: "1:613301118746:web:60dd2458d11185d2d02ea3",
    measurementId: "G-3WEPWQNX0Q"
  })
  firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION)
}

export { firebaseClient }
