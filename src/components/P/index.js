import styles from './styles.module.css'

export function P1({ children }) {
  return <p className={styles.p1}>{children}</p>
}
export function P2({ children }) {
  return <div className={styles.p2}>{children}</div>
}

export function P3({ children }) {
  return <div className={styles.p3}>{children}</div>
}
