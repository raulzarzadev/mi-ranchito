import ButtonBack from '@cmps/Inputs/ButtonBack'
import React from 'react'
import BottomNav from './BottomNav'
import NAV_LINKS from './NAV_LINKS'
import SideNav from './SideNav/SideNav'
import styles from './styles.module.css'



export default function DashboardCowsLayout({ children, buttonBack }) {
  const links = NAV_LINKS
  return (
    <div className={styles.cows_dashboard}>
      {buttonBack && <ButtonBack />}
      <div className={styles.dash_container}>{children}</div>
      <SideNav links={links} />
      <BottomNav links={links.filter((link) => link.side === 'bottom')} />
    </div>
  )
}
