import Button from '@cmps/Inputs/Button'
import styles from './styles.module.css'

export default function BottomNav({ links = [] }) {
  return (
    <div className={styles.bottom_navigation}>
      {links.map(({ href, icon, label }, i) => (
        <Button p='2' primary key={i} nextLink href={href} icon>
          {icon ? <img width="30px" src={icon} alt="" /> : label}
        </Button>
      ))}
    </div>
  )
}
