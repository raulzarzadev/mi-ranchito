import styles from './styles.module.css'

export function H1({ children, box }) {
  return (
    <h1 className={styles.h1} box={box}>
      {children}
    </h1>
  )
}

export function H2({ children, box }) {
  return (
    <h2 className={styles.h2} box={box}>
      {children}
    </h2>
  )
}

export function H3({ children, box }) {
  return (
    <h3 className={styles.h3} box={box}>
      {children}
    </h3>
  )
}
