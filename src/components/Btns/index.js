import styles from './styles.module.css'

export function Btn1({
  children = 'submit',

  ...rest
}) {
  return (
    <button className={`${styles.btn} ${styles.btn_1}`} {...rest}>
      {children}
    </button>
  )
}

export function Btn2({
  type = 'submit',
  children = 'submit',

  ...rest
}) {
  return (
    <button className={`${styles.btn} ${styles.btn_2}`} {...rest}>
      {children}
    </button>
  )
}
