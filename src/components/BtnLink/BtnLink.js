import L from '@cmps/L/L'
import React from 'react'
import styles from './styles.module.css'
export default function BtnLink({ href, label }) {
  return (
    <div className={styles.link}>
      <L href={href}>
        <div className={styles.btn_link}>{label}</div>
      </L>
    </div>
  )
}
