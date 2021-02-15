import styles from './styles.module.css'
import Link from 'next/link'
export default function L2({ label, children, href }) {
  return (
    <Link href={href}>
      <a className={styles.l2}>
        {label || children}
        <div className={styles.l2_underline}></div>
      </a>
    </Link>
  )
}
