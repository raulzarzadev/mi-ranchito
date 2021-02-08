import EarringTable from '@cmps/EarringTable'
import EventsHistory from '@cmps/EventsHistory'
import NewEarring from '@cmps/NewEarring'
import NewEvent from '@cmps/NewEvent'
import UpcomingEvents from '@cmps/UpcomingEvents'
import { useState } from 'react'
import styles from './styles.module.css'

export default function DashboardDisplay({}) {
  const [tabSelected, setTabSelected] = useState('PROX')
  const [title, setTitle] = useState('Proximamente')

  const handleChangeTab = (tab) => {
    setTabSelected(tab)
    switch (tab) {
      case 'PROX':
        setTitle('Proximamente')
        break
      case 'COW':
        setTitle('Nueva Vaca')
        break
      case 'EVENT':
        setTitle('Nueva Evento')
        break
      case 'HIST':
        setTitle('Eventos')
        break
      case 'ALL':
        setTitle('Vacas')
        break

      default:
        break
    }
  }

  return (
    <div>
      <div>
        <div className={styles.demo_tabs}>
          <div
            className={
              tabSelected === 'COW' ? styles.demo_tab : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab('COW')}
          >
            <h4>Nueva Vaca</h4>
          </div>
          <div
            className={
              tabSelected === 'EVENT'
                ? styles.demo_tab
                : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab('EVENT')}
          >
            <h4>Nuevo evento</h4>
          </div>
          <div
            className={
              tabSelected === 'PROX'
                ? styles.demo_tab
                : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab('PROX')}
          >
            <h4>Proximamente</h4>
          </div>
          <div
            className={
              tabSelected === 'HIST'
                ? styles.demo_tab
                : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab('HIST')}
          >
            <h4>Eventos</h4>
          </div>
          <div
            className={
              tabSelected === 'ALL' ? styles.demo_tab : styles.demo_tab_selected
            }
            onClick={() => handleChangeTab('ALL')}
          >
            <h4>Vacas</h4>
          </div>
        </div>
        <h3>{title}</h3>

        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'COW' ? 'block' : 'none' }}
        >
          <div className={styles.demo_display_form}>
            <NewEarring />
          </div>
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'EVENT' ? 'block' : 'none' }}
        >
          <div className={styles.demo_display_form}>
            <NewEvent />
          </div>
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'PROX' ? 'block' : 'none' }}
        >
          {/* <UpcomingEvents /> */}
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'HIST' ? 'block' : 'none' }}
        >
           <EventsHistory /> 
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'ALL' ? 'block' : 'none' }}
        >
          <EarringTable /> 
        </div>
      </div>
    </div>
  )
}
