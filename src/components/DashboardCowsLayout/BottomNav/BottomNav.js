import BtnBottom from '@cmps/BtnBottom/BtnBottom'
import styles from './styles.module.css'

export default function BottomNav({ links = [] }) {
  return (
    <div className={styles.bottom_navigation}>
      {links.map((link, i) => (
        <BtnBottom key={i} href={link.href} label={link.label} />
      ))}
    </div>
  )
}
