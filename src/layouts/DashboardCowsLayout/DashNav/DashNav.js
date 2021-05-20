import BtnBack from '@cmps/BtnBack/BtnBack'
import L from '@cmps/L/L'
import React, { useState } from 'react'
import styles from './styles.module.css'

export default function DashNav({ links = [] }) {
  const [tabSelected, setTabSelected] = useState('4')
  const handleSelectTab = (id) => {
    setTabSelected(id)
  }
  return (
    <>
      <BtnBack />
      <nav className={styles.dashboard_nav}>
        {links.map((link) => (
          <L key={link.id} href={link?.href}>
            <div
              className={`${styles.dashboard_btn} ${
                tabSelected === link.id && styles.dashboard_btn_selected
              }`}
              onClick={() => handleSelectTab(link.id)}
            >
              {link?.label}
            </div>
          </L>
        ))}
      </nav>
    </>
  )
}
