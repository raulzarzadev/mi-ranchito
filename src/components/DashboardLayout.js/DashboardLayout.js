import Layout from '@cmps/Layout'
import { Link } from '@material-ui/core'
import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <div>
      Diseño menu
      <Link href="/dashboard/cows">Cows</Link>
      <div></div>
      <div>{children}</div>
    </div>
  )
}
