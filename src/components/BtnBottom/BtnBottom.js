import L from '@cmps/L/L'
import styles from './styles.module.css'

export default function BtnBottom({ href, label, icon }) {
  return (
    <L href={href}>
      <div className={styles.button}>
        {icon ? <img width="40px" src={icon} alt="" /> : label}
      </div>
    </L>
  )
}
