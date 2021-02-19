import { H2 } from '@cmps/H'
import { EVENTS_TYPES } from '@raiz/constants/EVENTS_INFO'
import { formatEvent } from '@raiz/src/utils'
import styles from './styles.module.css'

export default function Calendar() {
  const events = EVENTS_TYPES
  const formatedEvents = events.map((event) => formatEvent(event))

  const regularEvents = formatedEvents.filter(
    (event) => event.category === 'regular'
  )
  const specialsEvents = formatedEvents.filter(
    (event) => event.category === 'special'
  )
  const adminEvents = formatedEvents.filter(
    (event) => event.category === 'admin'
  )

  return (
    <div >
      <div className={styles.calendar}>
        <H2>Eventos Regulares</H2>
        <div className={styles.calendar_row}>
          <div>
            <h5>Evento </h5>
          </div>

          <div>
            <h5>Desde el celo</h5>
          </div>
        </div>
        {regularEvents.map((event, i) => (
          <div key={i}>
            <div className={styles.calendar_row}>
              <div className={styles.calendar_title}>{event.label} </div>
              <div>
                <ProgressBar progress={event?.onDay} />
              </div>
            </div>
          </div>
        ))}

        <H2>Eventos Especiales</H2>
        <div className={styles.calendar_row}>
          <div>
            <h5>Evento </h5>
          </div>

          <div>
            <h5>Desde el celo</h5>
          </div>
        </div>
        {specialsEvents.map((event, i) => (
          <div key={i}>
            <div className={styles.calendar_row}>
              <div className={styles.calendar_title}>{event.label} </div>
              <div>
                <ProgressBar progress={event?.onDay} />
              </div>
            </div>
          </div>
        ))}

        <H2>Eventos Adiminstrativos</H2>
        <div className={styles.calendar_row}>
          <div>
            <h5>Evento </h5>
          </div>
        </div>
        {adminEvents.map((event, i) => (
          <div key={i}>
            <div className={styles.calendar_row}>
              <div className={styles.calendar_title}>{event.label} </div>
              <div>
                <ProgressBar progress={event?.onDay} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ProgressBar = ({ progress }) => (
  <div className={styles.progress_bar}>
    <div
      className={styles.progress}
      style={{ width: `${(progress / 283) * 50}%` }}
    ></div>
    <div className={styles.progress_placeholder}>{progress || 0}</div>
  </div>
)
