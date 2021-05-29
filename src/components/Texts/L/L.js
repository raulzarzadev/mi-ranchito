import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'


export default function L({ label, children, href, external, ...rest }) {
  return (
    <>
      {external ? (
        <a  className={styles.link} href={href} {...rest}>
          {label || children}
        </a>
      ) : (
        <Link href={href} {...rest}>
          <a className={styles.link}>{label || children}</a>
        </Link>
      )}
    </>
  )
}
