import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'

export default function L({ label, children, href, external, ...rest }) {
  return (
    <>
      {external ? (
        <a
          className={`${styles.link} ${styles.link_ext}`}
          href={href}
          {...rest}
        >
          {label || children}
        </a>
      ) : (
        <Link href={href} {...rest}>
          <a className={`${styles.link} ${styles.link_int}`}>
            {label || children}
          </a>
        </Link>
      )}
    </>
  )
}
