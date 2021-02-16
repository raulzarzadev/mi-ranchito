import styles from './styles.module.css'

export function H1({ children }) {
  return <h1 className={styles.h1}>{children}</h1>
}

export function H2({ children }) {
  return <h2 className={styles.h2}>{children}</h2>
}

export function H3({ children }) {
  return <h3 className={styles.H3}>{children}</h3>
}
