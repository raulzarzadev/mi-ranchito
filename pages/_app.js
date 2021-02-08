import { AuthProvider } from '@raiz/src/context/AuthContext'
import React from 'react'
import '../styles/globals.css'
import moment from 'moment'
moment.locale('es')

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
