import { AuthProvider } from '@raiz/src/context/AuthContext'
import React from 'react'
import Layout from '@raiz/src/layouts/Layout'
import moment from 'moment'
import fnsDate from 'date-fns'
/* ---- CSS----  */
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

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
