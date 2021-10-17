import ButtonBack from '@cmps/Inputs/ButtonBack'
import React from 'react'
import BottomNav from './BottomNav'
import SHEEPS_NAV_LINKS from './SHEEPS_NAV_LINKS'
import SideNav from './SideNav/SideNav'
import styles from './styles.module.css'



export default function DashboardSheepsLayout({ children, buttonBack }) {
  const links = SHEEPS_NAV_LINKS
  return (
    <div className={styles.cows_dashboard}>
      {buttonBack && <ButtonBack />}
      <div className=''>{children}</div>
      <SideNav links={links} />
      <BottomNav links={links.filter((link) => link.side === 'bottom')} />
    </div>
  )
}
