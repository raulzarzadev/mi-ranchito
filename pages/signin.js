import Layout from '@cmps/Layout'
import SignForm from '@cmps/SignForm/index.js/SignForm'
import React from 'react'

export default function Signin() {
  return (
    <div>
      Ingresa
      <SignForm />
    </div>
  )
}

Signin.Layout = Layout
