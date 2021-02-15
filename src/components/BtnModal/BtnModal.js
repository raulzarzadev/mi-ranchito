
import styles from './styles.module.css'

export default function ModalButton({
  onClick,
  label,
  primary,
  secondary,
  danger,
  success,
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`
        ${styles.btn} 
        ${styles.btn_primary}
        ${primary && styles.btn_primary}
        ${secondary && styles.btn_secondary}
        ${danger && styles.btn_danger}
        ${success && styles.btn_success}
      `}
    >
      {label}
    </button>
  )
}
