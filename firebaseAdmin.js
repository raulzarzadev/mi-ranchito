import * as firebaseAdmin from 'firebase-admin'
import { firebaseConfig } from './firebaseConfig'

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from './secrets.js'
console.log(serviceAccount)

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: firebaseConfig.databaseURL,
  })
}

export { firebaseAdmin }
