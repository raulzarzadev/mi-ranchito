import React from 'react'
import styles from './styles.module.css'

export default function SelectedTitle ({ title, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ fontWeight: selected ? 700 : 400 }}
      className={styles.title}
    >
      {title}
    </div>
  )
}
