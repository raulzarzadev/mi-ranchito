import styles from './styles.module.css'
import Link from 'next/link'
export function L1({ children, href = '' }) {
  return (
    <Link href={href}>
      <a className={styles.l1}>{children}</a>
    </Link>
  )
}

export function L2({ children, href = '' }) {
  return (
    <Link href={href}>
      <a className={styles.l2}>{children}</a>
    </Link>
  )
}

export function Lb({ children, href = '' }) {
  return (
    <Link href={href}>
      <a style={{fontSize:'.9rem'}}>{children}</a>
    </Link>
  )
}
