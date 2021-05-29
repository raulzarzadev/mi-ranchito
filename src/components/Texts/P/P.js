import styles from './styles.module.css'

export default function P({ children, secondary, strong }) {
  return (
    <p
      className={`${styles.paragraph} ${secondary && styles.secondary}  ${
        strong && styles.strong
      }`}
    >
      {children}
    </p>
  )
}
