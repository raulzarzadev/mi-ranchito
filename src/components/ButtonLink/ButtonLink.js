import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'

export default function ButtonLink({ href, label }) {
  return (
    <Link href={href}>
      <div className={styles.link}> {label}</div>
    </Link>
  )
}
