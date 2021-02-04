import React from 'react'
import styles from './styles.module.css'

export default function Modal() {
  return (
    <div className={styles.modal} id="modal-1">
      <div className={styles.modal_dialog}>
        <header className={styles.modal_header}>
          header
          <button className={styles.modal_button_close}>close</button>
        </header>
        <section className={styles.modal_content}>contendio del modal</section>
        <footer className={styles.modal_footer}>footer</footer>
      </div>
    </div>
  )
}
