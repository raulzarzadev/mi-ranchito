import { AuthProvider } from '@raiz/src/context/AuthContext'
import React from 'react'
import '../styles/globals.css'
import moment from 'moment'
import Layout from '@raiz/src/layouts/Layout'

moment.locale('es')

function MyApp({ Component, pageProps }) {
  const MainLayout = Component.Layout ? Component.Layout : Layout
  const SecondaryLayout = Component.SecondaryLayout || React.Fragment

  return (
    <AuthProvider>
      <MainLayout>
        <SecondaryLayout>
          <Component {...pageProps} />
        </SecondaryLayout>
      </MainLayout>
    </AuthProvider>
  )
}

export default MyApp
