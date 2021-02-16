import L from '@cmps/L/L'
import styles from './styles.module.css'

export default function BtnBottom({ href, label }) {
  return (
    <div className={styles.button}>
      <L href={href} label={label} />
      <div className={styles.button_underline}></div>
    </div>
  )
}
