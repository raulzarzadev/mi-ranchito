import { Lb } from '@cmps/L'
import styles from './styles.module.css'

export function Btn1({ href = null, children = 'submit', label, ...rest }) {
  if (href) {
    return (
      <Lb href={href}>
        <a className={`${styles.btn} ${styles.btn_1}`} {...rest}>
          {label || children}
        </a>
      </Lb>
    )
  } else {
    return (
      <button className={`${styles.btn} ${styles.btn_1}`} {...rest}>
        {label || children}
      </button>
    )
  }
}

export function Btn2({ href = null, children = 'submit', label, ...rest }) {
  if (href) {
    return (
      <Lb href={href}>
        <a className={`${styles.btn} ${styles.btn_2}`} {...rest}>
          {label || children}
        </a>
      </Lb>
    )
  } else {
    return (
      <button className={`${styles.btn} ${styles.btn_2}`} {...rest}>
        {label || children}
      </button>
    )
  }
}
