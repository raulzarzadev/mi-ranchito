import EarringTable from '@cmps/EarringTable'
import EventsHistory from '@cmps/EventsHistory'
import NewEarring from '@cmps/NewEarring'
import NewEvent from '@cmps/NewEvent'
import UpcomingEvents from '@cmps/UpcomingEvents'
import { ALL_EVENTS, EVENTS_LABEL } from '@raiz/HARD_DATA-COPY'
import { formatEvent } from '@raiz/src/utils'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function DashboardDisplay({
  events,
  earringsData,
  handleAddEarring,
  handleAddEvent,
}) {
  const eventsAvaiblable = ALL_EVENTS
  const eventLabels = EVENTS_LABEL
  const [tabSelected, setTabSelected] = useState('PROX')
  const [title, setTitle] = useState('Proximamente')

  // TODO aun hay que optimizar esto
  function firin(obj) {
    const auxArr = []
    for (const key in obj) {
      auxArr.push({ type: key, label: obj[key] })
      console.log(key, obj[key])
    }
    return auxArr
  }

  useEffect(() => {
    setFormatedEvents(events.map((event) => formatEvent(event, eventLabels)))
  }, [events])

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
  const [formatedEvents, setFormatedEvents] = useState(
    events.map((event) => formatEvent(event))
  )

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
            <NewEarring
              earrings={earringsData}
              handleAddEarring={handleAddEarring}
            />
          </div>
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'EVENT' ? 'block' : 'none' }}
        >
          <div className={styles.demo_display_form}>
            <NewEvent
              handleAddEvent={handleAddEvent}
              eventsAvaiblable={eventsAvaiblable}
              earrings={earringsData}
            />
          </div>
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'PROX' ? 'block' : 'none' }}
        >
          <UpcomingEvents events={formatedEvents} />
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'HIST' ? 'block' : 'none' }}
        >
          <EventsHistory events={formatedEvents} />
        </div>
        <div
          className={styles.demo_display}
          style={{ display: tabSelected === 'ALL' ? 'block' : 'none' }}
        >
          <EarringTable events={formatedEvents} earrings={earringsData} />
        </div>
      </div>
    </div>
  )
}
