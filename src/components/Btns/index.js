import styles from './styles.module.css'

export function Btn1({ children = 'submit', onClick = () => {}, ...rest }) {
  return (
    <button
      {...rest}
      className={`${styles.btn} ${styles.btn_1}`}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </button>
  )
}

export function Btn2({ children = 'submit', onClick = () => {}, ...rest }) {
  return (
    <button
      {...rest}
      className={`${styles.btn} ${styles.btn_2}`}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </button>
  )
}
